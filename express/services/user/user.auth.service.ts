import {
  ITokenService,
  ITokenPayload,
  IAuthService,
  IUserSessionRepository,
} from '../../interfaces';
import { errorHandler } from '../../utils/common/error.handlers';
import bcrypt from 'bcrypt';

export default class AuthService implements IAuthService {
  private tokenService: ITokenService;
  private userSessionRepository: IUserSessionRepository;

  constructor(
    tokenService: ITokenService,
    userSessionRepository: IUserSessionRepository,
  ) {
    this.tokenService = tokenService;
    this.userSessionRepository = userSessionRepository;
  }

  async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async validateAccessToken(accessToken: string): Promise<ITokenPayload> {
    try {
      const decoded = await this.tokenService.verifyAccessToken(accessToken);
      return decoded;
    } catch (error) {
      errorHandler(error, 'Недействительный access токен');
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    try {
      const decoded = await this.tokenService.verifyRefreshToken(refreshToken);
      return decoded;
    } catch (error) {
      errorHandler(error, 'Недействительный refresh токен');
    }
  }

  async refreshTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const newAccessToken = await this.tokenService.generateAccessToken(
      userId,
      email,
    );
    const newRefreshToken = await this.tokenService.generateRefreshToken(
      userId,
      email,
    );

    await this.userSessionRepository.updateRefreshToken(
      userId,
      newRefreshToken,
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
