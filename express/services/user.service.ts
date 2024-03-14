import { pool } from '../db/pool';
import IQuery from '../interfaces/query.interface';
import User from '../models/user.model';

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

  private async saveUserInfo(User: User): Promise<number> {
    const saveUserQuery = {
      text: 'INSERT INTO account_info (account_id, avatar_url, name, email, bio) VALUES ($1, $2, $3, $4, $5) returning account_id',
      values: [
        User.userId,
        User.avatarURL || null,
        User.name,
        User.email,
        User.bio || null,
      ],
    };

    const userResult = await this.startQuery(saveUserQuery);
    return userResult.rows[0].account_id;
  }

  private async saveSession(accountId: number, token: string): Promise<void> {
    const saveSessionUserQuery = {
      text: 'INSERT INTO account_credentials (account_id, password_hash) VALUES ($1, $2);',
      values: [accountId, token],
    };

    await this.startQuery(saveSessionUserQuery);
  }

  private async saveUserCredentials(
    accountId: number,
    passwordHash: string,
  ): Promise<void> {
    const saveUserCredentialsQuery = {
      text: 'INSERT INTO account_session (account_id, token) VALUES ($1, $2);',
      values: [accountId, passwordHash],
    };

    await this.startQuery(saveUserCredentialsQuery);
  }

  async saveUser(User: User): Promise<{ message: string }> {
    const account = await this.saveUserInfo(User);

    await this.saveSession(account, User.token);
    await this.saveUserCredentials(account, User.passwordHash);

    return { message: 'Пользователь успешно создан' };
  }

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

    return { message: 'Пользователь успешно изменён' };
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

    // TODO: Сделать многие проверки и вынести их
    if (result.rows.length === 0) {
      return null;
    }

    const userData = result.rows[0];
    const user = new User(
      userData.name,
      userData.email,
      '', // FIXME: Смущает
      userData.bio,
      userData.avatar_url,
    );
    user.userId = userData.account_id;

    return user;
  }
}
