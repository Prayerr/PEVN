import { IUser, IUserCredentials, IUserSession } from './user.interface';

export interface IUserRepository {
  saveUser(user: IUser): Promise<void>;
  updateUser(userId: string, newData: Partial<IUser>): Promise<void>;
  deleteUser(userId: string): Promise<void>;
  getUser(
    username: string | null,
    userId: string | null,
  ): Promise<IUser | null>;
}

export interface IUserSessionRepository {
  saveUserSession(session: IUserSession): Promise<void>;
  getRefreshToken(userId: string): Promise<string | null>;
  updateRefreshToken(userId: string, newRefreshToken: string): Promise<void>;
  deleteSession(userId: string): Promise<void>;
}

export interface IUserCredentialsRepository {
  saveUserCredentials(credentials: IUserCredentials): Promise<void>;
  getUserByEmail(email: string): Promise<IUserCredentials | null>;
}
