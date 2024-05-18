import { ITokenPayload, ITokenService } from '../../interfaces';
import jwt from 'jsonwebtoken';

export default class TokenService implements ITokenService {
  async generateAccessToken(userId: string, email: string): Promise<string> {
    const payload: ITokenPayload = { userId, email };

    if (!process.env.SECRET_ACCESS_KEY) {
      throw new Error('Отсутствует секретный ключ');
    }

    return jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
      expiresIn: '30m',
    });
  }

  async generateRefreshToken(userId: string, email: string): Promise<string> {
    const payload: ITokenPayload = { userId, email };

    if (!process.env.SECRET_REFRESH_KEY) {
      throw new Error('Отсутствует секретный ключ');
    }

    return jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: '30d',
    });
  }

  async verifyAccessToken(accessToken: string): Promise<ITokenPayload> {
    if (!process.env.SECRET_ACCESS_KEY) {
      throw new Error('Отсутствует секретный ключ');
    }

    return jwt.verify(
      accessToken,
      process.env.SECRET_ACCESS_KEY,
    ) as ITokenPayload;
  }

  async verifyRefreshToken(refreshToken: string): Promise<ITokenPayload> {
    if (!process.env.SECRET_REFRESH_KEY) {
      throw new Error('Отсутствует секретный ключ');
    }

    return jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_KEY,
    ) as ITokenPayload;
  }
}
