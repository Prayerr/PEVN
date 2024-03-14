import { IUser, EUserRole } from '../interfaces/user.interface';
import generateUUID from '../utils/user/user-generate-uuid';
import hashPassword from '../utils/user/user-hash-password';
import generateToken from '../utils/user/user-generate-token';

export default class User implements IUser {
  userId: string;
  passwordHash: string;
  name: string;
  email: string;
  bio?: string;
  token: string;
  likesCount: number;
  avatarURL?: string;
  role: EUserRole;

  constructor(
    name: string,
    email: string,
    password: string,
    bio?: string,
    avatarURL?: string,
    role: EUserRole = EUserRole.READER,
  ) {
    this.userId = '';
    this.token = '';
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.role = role;
    this.passwordHash = password;
    this.avatarURL = avatarURL;
    this.likesCount = 0;
  }

  hashPassword = async (password: string): Promise<void> => {
    this.passwordHash = await hashPassword(password);
  };

  generateToken = async (): Promise<void> => {
    this.token = await generateToken(this.userId, this.email);
  };

  generateUUID = async (): Promise<void> => {
    this.userId = await generateUUID();
  };
}
