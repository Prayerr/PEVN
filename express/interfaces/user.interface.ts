export interface IUser {
  userId: string;
  name: string;
  email: string;
  registrationDate: string;
  likesCount: number;
  avatarURL?: string;
  bio?: string;
}

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatarURL?: string;
}

export interface IUserCredentials {
  userCredentialsId: string;
  userId: string;
  passwordHash: string;
}

export interface IUserSession {
  userSessionId: string;
  deviceType: string;
  ipAddress: string;
  userId: string;
  token: string;
}
