import {
  IUserDTO,
  IUserCreateService,
  IUserServiceDB,
} from '../../interfaces/user.interface';
import User from '../../models/user/user.model';
import UserSession from '../../models/user/user.session';
import UserCredentials from '../../models/user/user.credentials';

export default class UserCreateService implements IUserCreateService {
  private userService: IUserServiceDB;

  constructor(userService: IUserServiceDB) {
    this.userService = userService;
  }

  async createUser(userData: IUserDTO): Promise<void> {
    const { name, email, password, bio, avatarURL } = userData;

    const user = new User(name, email, bio, avatarURL);
    await user.generateUserId();

    const userCredentials = new UserCredentials(user.userId, password);
    await userCredentials.generateUserCredentialsId();
    await userCredentials.hashPassword();

    const userSession = new UserSession(user.userId);
    await userSession.generateUserSessionId();
    await userSession.generateToken(email);

    await this.userService.saveUser(user);
    await this.userService.saveUserCredentials(userCredentials);
    await this.userService.saveUserSession(userSession);
  }
}
