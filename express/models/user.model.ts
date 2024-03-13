import { IUser, EUserRole } from '../interfaces/user.interface';
import generateUUID from '../utils/user/user-generate-uuid';
import hashPassword from '../utils/user/user-hash-password';
import generateToken from '../utils/user/user-generate-token';

export default class User implements IUser {
  passwordHash: string;
  userId: string;
  name: string;
  email: string;
  token: string | null;
  likesCount: number;
  avatarURL?: string | undefined;
  role: EUserRole;

  constructor(
    userId: string,
    name: string,
    email: string,
    password: string,
    role: EUserRole = EUserRole.READER,
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.token = null;
    this.likesCount = 0;
    this.role = role;
    this.passwordHash = password;
  }

  async hashPassword(password: string): Promise<void> {
    this.passwordHash = await hashPassword(password);
  }

  async generateToken(): Promise<void> {
    this.token = await generateToken(this.userId, this.email);
  }

  async generateUUID(): Promise<void> {
    this.userId = await generateUUID();
  }
}
