import User from '../../models/user/user.model';
import UserSession from '../../models/user/user.session';
import UserServiceDB from './user.service.db';
import UserCredentials from '../../models/user/user.credentials';

export default class UserCreateService {
  private userService: UserServiceDB;

  constructor() {
    this.userService = new UserServiceDB();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    bio?: string,
    avatarURL?: string,
  ): Promise<void> {
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
