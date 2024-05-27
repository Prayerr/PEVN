import { createLogger, format, transports } from 'winston';
import { ILogger } from '../domain/interfaces/infra';
import { injectable } from 'inversify';
import { fileURLToPath } from 'node:url';
import schedule from 'node-schedule';
import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirLogs = path.join(__dirname, '../../logs');

@injectable()
export default class Logger implements ILogger {
  private readonly logger;

  constructor() {
    this.logger = createLogger({
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

    this.ensureDirLogs();
    this.scheduleDeleteLogs();
  }

  private async ensureDirLogs(): Promise<void> {
    try {
      await fs.access(dirLogs);
    } catch (error) {
      await fs.mkdir(dirLogs, { recursive: true });
    }
  }

  private async deleteLogs(): Promise<void> {
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

  private scheduleDeleteLogs(): void {
    schedule.scheduleJob('0 * * * *', () => {
      this.deleteLogs().catch((error) =>
        console.error('Не удалось очистить логи:', error),
      );
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}
