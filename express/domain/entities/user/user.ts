import { IUser } from '../../interfaces';

export default class User implements IUser {
  readonly userId: string;
  readonly registrationDate: string;
  username: string;
  email: string;
  avatarURL?: string;
  bio?: string;

  constructor(
    userId: string,
    username: string,
    email: string,
    registrationDate: string,
    bio?: string,
    avatarURL?: string,
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.bio = bio;
    this.avatarURL = avatarURL;
    this.registrationDate = registrationDate;
  }
}
