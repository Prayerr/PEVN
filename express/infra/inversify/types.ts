const TYPES = {
  ILogger: Symbol.for('ILogger'),
  IErrorHandler: Symbol.for('IErrorHandler'),
  IMainRepository: Symbol.for('IMainRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  IUserSessionRepository: Symbol.for('IUserSessionRepository'),
  IUserCredentialsRepository: Symbol.for('IUserCredentialsRepository'),
  ITokenService: Symbol.for('ITokenService'),
  IAuthService: Symbol.for('IAuthService'),
  IUserCreateService: Symbol.for('IUserCreateService'),
  IUserMiddleware: Symbol.for('IUserMiddleware'),
  UserProfileController: Symbol.for('UserProfileController'),
};

export default TYPES;
