import { IUser } from '../../interfaces/user.interface';
import generateUUID from '../../utils/user/user-generate-uuid';

export default class User implements IUser {
  userId: string;
  name: string;
  email: string;
  bio?: string;
  likesCount: number;
  avatarURL?: string;

  constructor(name: string, email: string, bio?: string, avatarURL?: string) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.avatarURL = avatarURL;
    this.likesCount = 0;
  }

  async generateUserId() {
    this.userId = await generateUUID();
  }
}
