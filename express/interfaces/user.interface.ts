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
  token: string | null;
  likesCount: number;
  avatarURL?: string;
  passwordHash: string;
  role: EUserRole;
}
