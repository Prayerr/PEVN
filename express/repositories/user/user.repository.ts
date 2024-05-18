import { IUserRepository } from '../../interfaces';
import { errorHandlerRepositories } from '../../utils/common/error.handlers';
import User from '../../models/user/user.model';
import MainRepository from '../main.repository';

export default class UserRepository
  extends MainRepository
  implements IUserRepository
{
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
    } catch (error: unknown) {
      errorHandlerRepositories(error, 'Ошибка при сохранении пользователя');
    }
  }

  async updateUser(userId: string, newData: Partial<User>): Promise<void> {
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
    } catch (error: unknown) {
      errorHandlerRepositories(error, 'Ошибка при обновлении пользователя');
    }
  }

  async deleteUser(userId: string): Promise<void> {
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
    } catch (error: unknown) {
      errorHandlerRepositories(error, 'Ошибка при удалении пользователя');
    }
  }

  // TODO: Возможно, лучше разделить на методы getUserById и getUserByName
  async getUser(
    username: string | null,
    userId: string | null,
  ): Promise<User | null> {
    const getUserQuery = {
      text: `SELECT account_id, name, email, registration_date, avatar_url, bio
             FROM account_info
             WHERE (name = $1 OR $1 IS NULL)
               AND (account_id = $2 OR $2 IS NULL)`,
      values: [username, userId],
    };

    try {
      const result = await this.startQuery(getUserQuery);

      if (result.rows.length === 0) {
        return null;
      }

      const userData = result.rows[0];
      const user = new User(
        userData.name,
        userData.email,
        userData.registration_date,
        userData.avatar_url,
        userData.bio,
      );

      user.userId = userData.account_id;
      return user;
    } catch (error: unknown) {
      errorHandlerRepositories(error, 'Ошибка при получении пользователя');
    }
  }
}
