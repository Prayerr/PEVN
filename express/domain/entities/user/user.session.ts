import { IUserSession } from '../../interfaces';

export default class UserSession implements IUserSession {
  readonly userSessionId: string;
  readonly userId: string;
  deviceType: string;
  ipAddress: string;
  token: string;

  constructor(
    userSessionId: string,
    userId: string,
    deviceType: string,
    ipAddress: string,
    token: string,
  ) {
    this.userSessionId = userSessionId;
    this.userId = userId;
    this.ipAddress = ipAddress;
    this.deviceType = deviceType;
    this.token = token;
  }
}
