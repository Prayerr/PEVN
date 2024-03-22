import { IUserSession } from '../../interfaces/user.interface';
import generateToken from '../../utils/user/token,generator';
import generateUUID from '../../utils/common/uuid.generator';

export default class UserSession implements IUserSession {
  userSessionId: string;
  userId: string;
  token: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async generateUserSessionId() {
    this.userSessionId = await generateUUID();
  }

  async generateToken(email: string) {
    this.token = await generateToken(this.userId, email);
  }
}
