import { IUserCredentialsRepository } from '../../interfaces';
import { errorHandlerRepositories } from '../../utils/common/error.handlers';
import UserCredentials from '../../models/user/user.credentials';
import MainRepository from '../main.repository';

export default class UserCredentialsRepository
  extends MainRepository
  implements IUserCredentialsRepository
{
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
    } catch (error: unknown) {
      errorHandlerRepositories(
        error,
        'Ошибка при сохранении учетных данных пользователя:',
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserCredentials | null> {
    const getUserByEmailQuery = {
      text: 'SELECT ai.account_id, ai.email, ac.password_hash FROM account_info AS ai JOIN account_credentials AS ac ON ai.account_id = ac.account_id WHERE ai.email = $1;',
      values: [email],
    };
    try {
      const result = await this.startQuery(getUserByEmailQuery);

      if (result.rows.length === 0) {
        return null;
      }

      const userData = result.rows[0];
      const userCredentials = new UserCredentials(
        userData.account_id,
        userData.password_hash,
      );

      userCredentials.userId = userData.account_id;
      return userCredentials;
    } catch (error: unknown) {
      return errorHandlerRepositories(
        error,
        'Ошибка при получении пользователя по email:',
      );
    }
  }
}
