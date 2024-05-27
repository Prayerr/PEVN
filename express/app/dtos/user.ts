export default interface IUserDTO {
  name: string;
  email: string;
  password: string;
  userId?: string;
  bio?: string;
  avatarURL?: string;
  registrationDate?: string;
}
