import { IUserDTO } from './user.interface';

export interface ITokenPayload {
  userId: string;
  email: string;
}

export interface IQuery {
  text: string;
  values: (string | number | null)[];
}

export interface IUserCreateService {
  createUser(
    userData: IUserDTO,
    ipAddress: string,
    deviceType: string,
  ): Promise<{ userId: string; accessToken: string }>;
}

export interface ITokenService {
  generateAccessToken(userId: string, email: string): Promise<string>;
  generateRefreshToken(userId: string, email: string): Promise<string>;
  verifyAccessToken(accessToken: string): Promise<ITokenPayload>;
  verifyRefreshToken(refreshToken: string): Promise<ITokenPayload>;
}

export interface IAuthService {
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  validateAccessToken(accessToken: string): Promise<ITokenPayload>;
  validateRefreshToken(refreshToken: string): Promise<ITokenPayload>;
  refreshTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
