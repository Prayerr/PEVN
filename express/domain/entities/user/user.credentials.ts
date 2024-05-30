import { IUserCredentials } from '../../interfaces';

export default class UserCredentials implements IUserCredentials {
  readonly userCredentialsId: string;
  readonly userId: string;
  passwordHash: string;

  constructor(userCredentialsId: string, userId: string, password: string) {
    this.userCredentialsId = userCredentialsId;
    this.userId = userId;
    this.passwordHash = password;
  }
}
