import { Container } from 'inversify';
import { TYPE } from 'inversify-express-utils';
import {
  IErrorHandler,
  ILogger,
  IMainRepository,
  IUserRepository,
  IUserSessionRepository,
  IUserCredentialsRepository,
  ITokenService,
  IAuthService,
} from '../../domain/interfaces';

import Logger from '../logger';
import ErrorHandler from '../error.handlers';
import MainRepository from '../repositories/main.repo';
import UserRepository from '../repositories/user/user.repo';
import UserSessionRepository from '../repositories/user/user.session.repo';
import UserCredentialsRepository from '../repositories/user/user.credentials.repo';
import TokenService from '../../app/services/user/token';
import AuthService from '../../app/services/user/auth';
import UserController from '../../http/user/user.controller';

const container = new Container();

// Утилиты
container.bind<ILogger>('ILogger').to(Logger).inSingletonScope();
container
  .bind<IErrorHandler>('IErrorHandler')
  .to(ErrorHandler)
  .inSingletonScope();

// Репо
container
  .bind<IMainRepository>('IMainRepository')
  .to(MainRepository)
  .inSingletonScope();
container
  .bind<IUserRepository>('IUserRepository')
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<IUserSessionRepository>('IUserSessionRepository')
  .to(UserSessionRepository)
  .inSingletonScope();
container
  .bind<IUserCredentialsRepository>('IUserCredentialsRepository')
  .to(UserCredentialsRepository)
  .inSingletonScope();

// Сервисы
container
  .bind<ITokenService>('ITokenService')
  .to(TokenService)
  .inSingletonScope();
container.bind<IAuthService>('IAuthService').to(AuthService).inSingletonScope();

// Контроллеры
container
  .bind(TYPE.Controller)
  .to(UserController)
  .whenTargetNamed('UserController');

export default container;
