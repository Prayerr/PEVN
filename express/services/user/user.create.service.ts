import { IUserDTO } from '../../interfaces/user.interface';
import {
  ITokenService,
  IUserCreateService,
} from '../../interfaces/service.interface';
import {
  IUserSessionRepository,
  IUserCredentialsRepository,
  IUserRepository,
} from '../../interfaces/repository.interface';
import User from '../../models/user/user.model';
import UserSession from '../../models/user/user.session';
import UserCredentials from '../../models/user/user.credentials';

export default class UserCreateService implements IUserCreateService {
  private userSessionRepository: IUserSessionRepository;
  private userCredentialsRepository: IUserCredentialsRepository;
  private userRepository: IUserRepository;
  private tokenService: ITokenService;

  constructor(
    tokenService: ITokenService,
    userSessionRepository: IUserSessionRepository,
    userCredentialsRepository: IUserCredentialsRepository,
    userRepository: IUserRepository,
  ) {
    this.tokenService = tokenService;
    this.userSessionRepository = userSessionRepository;
    this.userCredentialsRepository = userCredentialsRepository;
    this.userRepository = userRepository;
  }

  async createUser(
    userData: IUserDTO,
    ipAddress: string,
    deviceType: string,
  ): Promise<void> {
    const { name, email, password, bio, avatarURL } = userData;

    const user = new User(name, email, bio, avatarURL);
    await user.generateUserId();

    const userCredentials = new UserCredentials(user.userId, password);
    await userCredentials.generateUserCredentialsId();
    await userCredentials.hashPassword();

    const userSession = new UserSession(
      user.userId,
      deviceType,
      this.tokenService,
    );
    await userSession.generateUserSessionId();
    await userSession.generateToken(email);

    userSession.ipAddress = ipAddress;

    await this.userRepository.saveUser(user);
    await this.userCredentialsRepository.saveUserCredentials(userCredentials);
    await this.userSessionRepository.saveUserSession(userSession);
  }
}
