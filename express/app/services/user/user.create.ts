import { injectable, inject } from 'inversify';
import {
  ITokenService,
  IUserCreateService,
  IUserSessionRepository,
  IUserCredentialsRepository,
  IUserRepository,
} from '../../../domain/interfaces';
import { IUserDTO } from '../../dtos/user';
import TYPES from '../../../infra/inversify/types';
import User from '../../../domain/entities/user/user';
import UserSession from '../../../domain/entities/user/user.session';
import UserCredentials from '../../../domain/entities/user/user.credentials';
import hashPassword from '../../../infra/utils/generators/hash';
import generateUUID from '../../../infra/utils/generators/uuid';

@injectable()
export default class UserCreateService implements IUserCreateService {
  constructor(
    @inject(TYPES.ITokenService) private tokenService: ITokenService,
    @inject(TYPES.IUserSessionRepository)
    private userSessionRepository: IUserSessionRepository,
    @inject(TYPES.IUserCredentialsRepository)
    private userCredentialsRepository: IUserCredentialsRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser(
    userData: IUserDTO,
    ipAddress: string,
    deviceType: string,
  ): Promise<{ userId: string; accessToken: string }> {
    const { name, email, password, bio, avatarURL } = userData;

    const userId = await generateUUID();
    const user = new User(userId, name, email, bio, avatarURL);

    const userCredentialsId = await generateUUID();
    const passwordHash = await hashPassword(password);
    const userCredentials = new UserCredentials(
      userCredentialsId,
      userId,
      passwordHash,
    );

    const userSessionId = await generateUUID();
    const refreshToken = await this.tokenService.generateRefreshToken(
      userId,
      email,
    );
    const userSession = new UserSession(
      userSessionId,
      userId,
      deviceType,
      ipAddress,
      refreshToken,
    );

    const accessToken = await this.tokenService.generateAccessToken(
      userId,
      email,
    );

    await this.userRepository.saveUser(user);
    await this.userSessionRepository.saveUserSession(userSession);
    await this.userCredentialsRepository.saveUserCredentials(userCredentials);

    return { userId, accessToken };
  }
}
