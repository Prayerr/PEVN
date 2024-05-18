import { IUserSession } from '../../interfaces';
import generateUUID from '../../utils/common/uuid.generator';

export default class UserSession implements IUserSession {
  userSessionId: string;
  deviceType: string;
  ipAddress: string;
  userId: string;
  token: string;

  constructor(userId: string, deviceType: string) {
    this.userId = userId;
    this.deviceType = deviceType;
  }

  async generateSessionId() {
    this.userSessionId = await generateUUID();
  }
}
