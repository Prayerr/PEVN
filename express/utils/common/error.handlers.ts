import logger from './logger';

// Основной обработчик ошибок
export function errorHandler(error: unknown, errorMessage: string): never {
  if (error instanceof Error) {
    logger.error(`Произошла ошибка, ${error}: ${errorMessage}`);
    throw error;
  } else {
    console.error(errorMessage, 'Неизвестная ошибка:', error);
    throw new Error(errorMessage);
  }
}

// Обработчик ошибок конкретно для репозиториев (С Postgres'овским кодом ошибок)
export function errorHandlerRepositories(
  error: unknown,
  errorMessage: string,
): never {
  if (error instanceof Error) {
    const errorCode = (error as any).code;
    logger.error(
      `Ошибка в репозиториях, ${errorMessage}: ${error.message}, Код ошибки: ${errorCode}`,
      { stack: error.stack },
    );
    throw error;
  } else {
    logger.error(`${errorMessage}: Неизвестная ошибка`, { error });
    throw new Error(errorMessage);
  }
}
