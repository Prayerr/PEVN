import { IUserSessionRepository } from '../../interfaces/repository.interface';
import UserSession from '../../models/user/user.session';
import MainRepository from '../main.repository';

export default class UserSessionRepository
  extends MainRepository
  implements IUserSessionRepository
{
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
      await this.startQuery(saveUserSessionQuery);
    } catch (error) {
      console.error(
        'Ошибка при сохранении сеанса пользователя:',
        error.message,
      );
      throw error;
    }
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const getRefreshTokenQuery = {
      text: 'SELECT refresh_token FROM account_session WHERE account_id = $1',
      values: [userId],
    };
    try {
      const result = await this.startQuery(getRefreshTokenQuery);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0].refresh_token;
    } catch (error) {
      console.error('Ошибка при получении refresh token:', error.message);
      throw error;
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
      await this.startQuery(updateRefreshTokenQuery);
    } catch (error) {
      console.error('Ошибка при обновлении refresh token:', error.message);
      throw error;
    }
  }

  async deleteSession(userId: string): Promise<void> {
    const deleteSessionQuery = {
      text: 'DELETE FROM account_session WHERE account_id = $1',
      values: [userId],
    };
    try {
      await this.startQuery(deleteSessionQuery);
    } catch (error) {
      console.error('Ошибка при удалении refresh token:', error.message);
      throw error;
    }
  }
}
