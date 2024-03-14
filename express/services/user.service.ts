import { pool } from '../db/pool';
import IQuery from '../interfaces/query.interface';
import User from '../models/user/user.model';
import UserSession from '../models/user/user.session';
import UserCredentials from '../models/user/user.credentials';

export default class UserServiceDB {
  private async ensureConnection() {
    try {
      const client = await pool.connect();

      if (!client) {
        throw new Error('Отсутствует соединение с базой данных');
      }

      return client;
    } catch (error) {
      console.error('Ошибка соединения с базой данных:', error);
      throw error;
    }
  }

  // FIXME: По документации юзать пуловое соединение с транзакциями нежелательно
  private async startQuery(IQuery: IQuery) {
    const client = await this.ensureConnection();
    try {
      await client.query('BEGIN');
      const result = await client.query(IQuery);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Ошибка выполнения запроса: ${error.message}`);
    } finally {
      client.release();
    }
  }

  private async handlerServiceError(error: Error): Promise<void> {
    console.error('Ошибка при создании пользователя:', error);
    throw error;
  }

  async saveUser(user: User): Promise<void> {
    const saveUserQuery = {
      text: 'INSERT INTO account_info (account_id, avatar_url, name, email, bio) VALUES ($1, $2, $3, $4, $5)',
      values: [
        user.userId,
        user.avatarURL || null,
        user.name,
        user.email,
        user.bio || null,
      ],
    };
    try {
      await this.startQuery(saveUserQuery);
    } catch (error) {
      this.handlerServiceError(error);
    }
  }

  async saveUserCredentials(credentials: UserCredentials): Promise<void> {
    const saveUserCredentialsQuery = {
      text: 'INSERT INTO account_credentials (account_credentials_id, account_id, password_hash) VALUES ($1, $2, $3)',
      values: [
        credentials.userCredentialsId,
        credentials.userId,
        credentials.passwordHash,
      ],
    };
    try {
      await this.startQuery(saveUserCredentialsQuery);
    } catch (error) {
      this.handlerServiceError(error);
    }
  }

  async saveUserSession(session: UserSession): Promise<void> {
    const saveUserSessionQuery = {
      text: 'INSERT INTO account_session (account_session_id, account_id, token) VALUES ($1, $2, $3)',
      values: [session.userSessionId, session.userId, session.token],
    };
    try {
      await this.startQuery(saveUserSessionQuery);
    } catch (error) {
      this.handlerServiceError(error);
    }
  }

  // TODO: Доделать обработку ошибок
  async updateUser(
    userId: string,
    newData: Partial<User>,
  ): Promise<{ message: string }> {
    const updateQuery = {
      text: 'UPDATE account_info SET name = $1, email = $2, bio = $3, avatar_url = $4 WHERE account_id = $5',
      values: [
        newData.name || null,
        newData.email || null,
        newData.bio || null,
        newData.avatarURL || null,
        userId,
      ],
    };
    await this.startQuery(updateQuery);
    return { message: 'Пользователь успешно изменен' };
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    const deleteQueries = [
      {
        text: 'DELETE FROM account_credentials WHERE account_id = $1',
        values: [userId],
      },
      {
        text: 'DELETE FROM account_session WHERE account_id = $1',
        values: [userId],
      },
      {
        text: 'DELETE FROM account_info WHERE account_id = $1',
        values: [userId],
      },
    ];
    for (const deleteQuery of deleteQueries) {
      await this.startQuery(deleteQuery);
    }
    return { message: 'Пользователь успешно удален' };
  }

  async getUser(userId: string): Promise<User | null> {
    const getUserQuery = {
      text: 'SELECT account_id, avatar_url, name, email, bio FROM account_info WHERE account_id = $1',
      values: [userId],
    };
    const result = await this.startQuery(getUserQuery);
    if (result.rows.length === 0) {
      return null;
    }
    const userData = result.rows[0];
    const user = new User(
      userData.name,
      userData.email,
      userData.bio,
      userData.avatarURL,
    );
    user.userId = userData.account_id;
    return user;
  }
}
