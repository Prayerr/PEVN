import { createLogger, format, transports } from 'winston';

// Создание Winston логгера
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),

  defaultMeta: { service: 'web' },
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} [${level}]: ${message}`,
        ),
      ),
    }),

    // Более точное логирование ошибок
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),

    new transports.File({
      filename: 'logfile.log',
      level: 'info',
      format: format.combine(
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`,
        ),
      ),
    }),
  ],
});

export default logger;
