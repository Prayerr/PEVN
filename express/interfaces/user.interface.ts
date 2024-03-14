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
  token: string;
  likesCount: number;
  avatarURL?: string;
  bio?: string;
  passwordHash: string;
  role: EUserRole;
}
