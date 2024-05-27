import { injectable, inject } from 'inversify';
import bcrypt from 'bcrypt';
import {
  IErrorHandler,
  ITokenService,
  ITokenPayload,
  IAuthService,
  IUserSessionRepository,
} from '../../../domain/interfaces';

@injectable()
export default class AuthService implements IAuthService {
  constructor(
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IUserSessionRepository')
    private userSessionRepository: IUserSessionRepository,
    @inject('IErrorHandler') private errorHandler: IErrorHandler,
  ) {}

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
      return this.errorHandler.errorHandler(
        error,
        'Недействительный access токен',
      );
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    try {
      const decoded = await this.tokenService.verifyRefreshToken(refreshToken);
      return decoded;
    } catch (error) {
      return this.errorHandler.errorHandler(
        error,
        'Недействительный refresh токен',
      );
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
