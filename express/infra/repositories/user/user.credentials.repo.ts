import { injectable, inject } from 'inversify';
import {
  IUserCredentialsRepository,
  IMainRepository,
  IErrorHandler,
} from '../../../domain/interfaces';
import UserCredentials from '../../../domain/entities/user/user.credentials';

@injectable()
export default class UserCredentialsRepository
  implements IUserCredentialsRepository
{
  constructor(
    @inject('IMainRepository') private mainRepository: IMainRepository,
    @inject('IErrorHandler') private errorHandler: IErrorHandler,
  ) {}

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
      await this.mainRepository.startQuery(saveUserCredentialsQuery);
    } catch (error: unknown) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при сохранении учетных данных пользователя:',
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserCredentials | null> {
    const getUserByEmailQuery = {
      text: 'SELECT account_credentials_id, ai.account_id, ac.password_hash FROM account_info AS ai JOIN account_credentials AS ac ON ai.account_id = ac.account_id WHERE ai.email = $1;',
      values: [email],
    };
    try {
      const result = await this.mainRepository.startQuery(getUserByEmailQuery);

      if (result.rows.length === 0) {
        return null;
      }

      const userData = result.rows[0];
      const userCredentials = new UserCredentials(
        userData.account_credentials_id,
        userData.account_id,
        userData.password_hash,
      );

      return userCredentials;
    } catch (error: unknown) {
      return this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка при получении пользователя по email:',
      );
    }
  }
}
