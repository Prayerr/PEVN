import { createLogger, format, transports } from 'winston';
import schedule from 'node-schedule';
import path from 'node:path';
import fs from 'node:fs/promises';

const dirLogs = path.join(import.meta.dirname, '../../logs');

// Создание папки для логов (Если её нет, т.к. она в .gitignore)
async function ensureDirLogs(): Promise<void> {
  try {
    await fs.access(dirLogs);
  } catch (error) {
    await fs.mkdir(dirLogs, { recursive: true });
  }
}

ensureDirLogs().catch((error) => {
  console.error('Ошибка при создании директории для логов:', error);
});

// Удаление логов
async function deleteLogs(): Promise<void> {
  try {
    const logFiles = await fs.readdir(dirLogs);

    await Promise.all(
      logFiles.map(async (logFile) => {
        await fs.unlink(path.join(dirLogs, logFile));
      }),
    );

    console.log('Логи успешно очищены');
  } catch (error) {
    console.error('Не удалось очистить логи:', error);
  }
}

// Удаление логов каждый час
schedule.scheduleJob('0 * * * *', () => {
  deleteLogs().catch((error) =>
    console.error('Не удалось очистить логи:', error),
  );
});

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
      filename: path.join(dirLogs, 'error.log'),
      level: 'error',
    }),

    new transports.File({
      filename: path.join(dirLogs, 'logfile.log'),
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
