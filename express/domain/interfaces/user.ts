export interface IUser {
  readonly userId: string;
  readonly registrationDate: string;
  username: string;
  email: string;
  avatarURL?: string;
  bio?: string;
}

export interface IUserCredentials {
  readonly userCredentialsId: string;
  readonly userId: string;
  passwordHash: string;
}

export interface IUserSession {
  readonly userSessionId: string;
  readonly userId: string;
  deviceType: string;
  ipAddress: string;
  token: string;
}
