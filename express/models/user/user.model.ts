import { IUser } from '../../interfaces';
import generateUUID from '../../utils/common/uuid.generator';

export default class User implements IUser {
  userId: string;
  name: string;
  email: string;
  registrationDate: string;
  likesCount: number;
  avatarURL?: string;
  bio?: string;

  constructor(
    name: string,
    email: string,
    registrationDate: string,
    bio?: string,
    avatarURL?: string,
  ) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.avatarURL = avatarURL;
    this.registrationDate = registrationDate;
    this.likesCount = 0;
  }

  async generateUserId() {
    this.userId = await generateUUID();
  }
}
