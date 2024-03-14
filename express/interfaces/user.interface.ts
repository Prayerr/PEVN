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
