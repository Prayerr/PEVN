import { Container } from 'inversify';
import { TYPE } from 'inversify-express-utils';
import TYPES from './types';
import {
  IErrorHandler,
  ILogger,
  IMainRepository,
  IUserRepository,
  IUserSessionRepository,
  IUserCredentialsRepository,
  ITokenService,
  IAuthService,
  IUserCreateService,
  IUserMiddleware,
} from '../../domain/interfaces';

import Logger from '../logger';
import ErrorHandler from '../error.handlers';
import MainRepository from '../repositories/main.repo';
import UserRepository from '../repositories/user/user.repo';
import UserSessionRepository from '../repositories/user/user.session.repo';
import UserCredentialsRepository from '../repositories/user/user.credentials.repo';
import TokenService from '../../app/services/user/token';
import AuthService from '../../app/services/user/auth';
import UserCreateService from '../../app/services/user/user.create';
import UserMiddleware from '../../http/user/user.middleware';
import UserProfileController from '../../http/user/user.controller';

const container = new Container();

// Утилиты
container.bind<ILogger>(TYPES.ILogger).to(Logger).inSingletonScope();
container
  .bind<IErrorHandler>(TYPES.IErrorHandler)
  .to(ErrorHandler)
  .inSingletonScope();

// Репо
container
  .bind<IMainRepository>(TYPES.IMainRepository)
  .to(MainRepository)
  .inSingletonScope();
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepository)
  .inSingletonScope();
container
  .bind<IUserSessionRepository>(TYPES.IUserSessionRepository)
  .to(UserSessionRepository)
  .inSingletonScope();
container
  .bind<IUserCredentialsRepository>(TYPES.IUserCredentialsRepository)
  .to(UserCredentialsRepository)
  .inSingletonScope();

// Сервисы
container
  .bind<ITokenService>(TYPES.ITokenService)
  .to(TokenService)
  .inSingletonScope();
container
  .bind<IUserCreateService>(TYPES.IUserCreateService)
  .to(UserCreateService)
  .inSingletonScope();
container
  .bind<IAuthService>(TYPES.IAuthService)
  .to(AuthService)
  .inSingletonScope();

// Миддлвары
container
  .bind<IUserMiddleware>(TYPES.IUserMiddleware)
  .to(UserMiddleware)
  .inSingletonScope();

// Контроллеры
container
  .bind(TYPE.Controller)
  .to(UserProfileController)
  .whenTargetNamed(TYPES.UserProfileController);

export default container;
