import { ITokenService } from '../../interfaces/service.interface';
import { IUserSession } from '../../interfaces/user.interface';
import generateUUID from '../../utils/common/uuid.generator';

export default class UserSession implements IUserSession {
  private tokenService: ITokenService;
  userSessionId: string;
  deviceType: string;
  ipAddress: string;
  userId: string;
  token: string;

  constructor(userId: string, deviceType: string, tokenService: ITokenService) {
    this.userId = userId;
    this.tokenService = tokenService;
    this.userSessionId = '';
    this.ipAddress = '';
    this.token = '';
    this.deviceType = deviceType;
  }

  async generateUserSessionId() {
    this.userSessionId = await generateUUID();
  }

  async generateToken(email: string) {
    this.token = await this.tokenService.generateRefreshToken(
      this.userId,
      email,
    );
  }
}
