// TODO: Вместе с реализацией ролей в БД, сделать и реализацию ролей на сервере
export enum EUserRole {
  READER = 'reader',
  EDITOR = 'editor',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export interface IUser {
  userId: string;
  name: string;
  email: string;
  likesCount: number;
  avatarURL?: string;
  bio?: string;
}

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatarURL?: string;
}

export interface IUserCredentials {
  userCredentialsId: string;
  userId: string;
  passwordHash: string;
}

export interface IUserSession {
  userSessionId: string;
  userId: string;
  token: string;
}

export interface IUserCreateService {
  createUser(userData: IUserDTO): Promise<void>;
}

export interface IUserServiceDB {
  saveUser(user: IUser): Promise<void>;
  saveUserCredentials(credentials: IUserCredentials): Promise<void>;
  saveUserSession(session: IUserSession): Promise<void>;
  updateUser(
    userId: string,
    newData: Partial<IUser>,
  ): Promise<{ message: string }>;
  deleteUser(userId: string): Promise<{ message: string }>;
  getUser(userId: string): Promise<IUser | null>;
}
