import {
  ITokenService,
  ITokenPayload,
  IAuthService,
} from '../../interfaces/service.interface';
import { IUserSessionRepository } from '../../interfaces/repository.interface';
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
      throw new Error('Недействительный access токен');
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    try {
      const decoded = await this.tokenService.verifyRefreshToken(refreshToken);
      return decoded;
    } catch (error) {
      throw new Error('Недействительный refresh токен');
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
