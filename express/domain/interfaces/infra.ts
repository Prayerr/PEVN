export interface ILogger {
  info(msg: string): void;
  error(msg: string): void;
}

export interface IErrorHandler {
  errorHandler(error: unknown, errorMessage: string): never;
  errorHandlerRepositories(error: unknown, errorMessage: string): never;
}
