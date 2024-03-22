import MainServiceDB from '../common/main.service.db';
import User from '../../models/user/user.model';
import UserSession from '../../models/user/user.session';
import UserCredentials from '../../models/user/user.credentials';

export default class UserServiceDB extends MainServiceDB {
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
      console.error('Ошибка при сохранении пользователя:', error.message);
      throw error;
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
      console.error(
        'Ошибка при сохранении учетных данных пользователя:',
        error.message,
      );
      throw error;
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
      console.error(
        'Ошибка при сохранении сеанса пользователя:',
        error.message,
      );
      throw error;
    }
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
    try {
      await this.startQuery(updateQuery);
      return { message: 'Пользователь успешно изменен' };
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error.message);
      throw error;
    }
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

    try {
      for (const deleteQuery of deleteQueries) {
        await this.startQuery(deleteQuery);
      }
      return { message: 'Пользователь успешно удален' };
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error.message);
      throw error;
    }
  }

  async getUser(userId: string): Promise<User | null> {
    const getUserQuery = {
      text: 'SELECT account_id, avatar_url, name, email, bio FROM account_info WHERE account_id = $1',
      values: [userId],
    };
    try {
      const result = await this.startQuery(getUserQuery);

      const userData = result.rows[0];
      const user = new User(
        userData.name,
        userData.email,
        userData.bio,
        userData.avatarURL,
      );
      user.userId = userData.account_id;
      return user;
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error.message);
      throw error;
    }
  }
}
