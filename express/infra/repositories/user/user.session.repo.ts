import { injectable, inject } from 'inversify';
import {
  IUserSessionRepository,
  IErrorHandler,
  IMainRepository,
} from '../../../domain/interfaces';
import UserSession from '../../../domain/entities/user/user.session';
import TYPES from '../../inversify/types';

@injectable()
export default class UserSessionRepository implements IUserSessionRepository {
  constructor(
    @inject(TYPES.IMainRepository) private mainRepository: IMainRepository,
    @inject(TYPES.IErrorHandler) private errorHandler: IErrorHandler,
  ) {}

  async saveUserSession(session: UserSession): Promise<void> {
    const saveUserSessionQuery = {
      text: 'INSERT INTO account_session (account_session_id, account_id, ip_address, device_type, refresh_token) VALUES ($1, $2, $3, $4, $5)',
      values: [
        session.userSessionId,
        session.userId,
        session.ipAddress,
        session.deviceType,
        session.token,
      ],
    };
    try {
      await this.mainRepository.startQuery(saveUserSessionQuery);
    } catch (error: unknown) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при обновлении сессии пользователя',
      );
    }
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const getRefreshTokenQuery = {
      text: 'SELECT refresh_token FROM account_session WHERE account_id = $1',
      values: [userId],
    };
    try {
      const result = await this.mainRepository.startQuery(getRefreshTokenQuery);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].refresh_token;
    } catch (error: unknown) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при получении refresh token:',
      );
    }
  }

  async updateRefreshToken(
    userId: string,
    newRefreshToken: string,
  ): Promise<void> {
    const updateRefreshTokenQuery = {
      text: 'UPDATE account_session SET refresh_token = $1 WHERE account_id = $2',
      values: [newRefreshToken, userId],
    };
    try {
      await this.mainRepository.startQuery(updateRefreshTokenQuery);
    } catch (error: unknown) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при обновлении refresh token:',
      );
    }
  }

  async deleteSession(userId: string): Promise<void> {
    const deleteSessionQuery = {
      text: 'DELETE FROM account_session WHERE account_id = $1',
      values: [userId],
    };
    try {
      await this.mainRepository.startQuery(deleteSessionQuery);
    } catch (error: unknown) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при удалении refresh token:',
      );
    }
  }
}
