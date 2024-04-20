import { IUserCredentials } from '../../interfaces/user.interface';
import hashPassword from '../../utils/user/hash.generator';
import generateUUID from '../../utils/common/uuid.generator';

export default class UserCredentials implements IUserCredentials {
  userCredentialsId: string;
  userId: string;
  passwordHash: string;

  constructor(userId: string, password: string) {
    this.userId = userId;
    this.passwordHash = password;
    this.userCredentialsId = '';
  }

  async generateUserCredentialsId() {
    this.userCredentialsId = await generateUUID();
  }

  async hashPassword() {
    this.passwordHash = await hashPassword(this.passwordHash);
  }
}
