export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  userId?: string;
  bio?: string;
  avatarURL?: string;
  registrationDate?: string;
}

export interface IUserPublicDTO {
  name: string;
  bio?: string | null;
  avatarURL?: string | null;
  registrationDate?: string;
}
