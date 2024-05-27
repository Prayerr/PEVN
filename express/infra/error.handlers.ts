import { IErrorHandler, ILogger } from '../domain/interfaces';
import TYPES from './inversify/types';
import { injectable, inject } from 'inversify';

@injectable()
export default class ErrorHandler implements IErrorHandler {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  errorHandler(error: unknown, errorMessage: string): never {
    if (error instanceof Error) {
      this.logger.error(`Произошла ошибка, ${error}: ${errorMessage}`);
      throw error;
    } else {
      this.logger.error(`${errorMessage}, Неизвестная ошибка:, ${error}`);
      throw new Error(errorMessage);
    }
  }

  errorHandlerRepositories(error: unknown, errorMessage: string): never {
    if (error instanceof Error) {
      const errorCode = (error as any).code;
      this.logger.error(
        `Ошибка в репозиториях, ${errorMessage}: ${error.message}, Код ошибки: ${errorCode}`,
      );
      throw error;
    } else {
      this.logger.error(`${errorMessage}: Неизвестная ошибка ${error}`);
      throw new Error(errorMessage);
    }
  }
}
