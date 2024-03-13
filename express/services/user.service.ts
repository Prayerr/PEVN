import pool from '../db/pools';
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

  // TODO: Поработать с UUID и с БДшкой и роутинг
  private async savePerson(User: User): Promise<number> {
    const personQuery = {
      text: 'INSERT INTO person (username, email) VALUES ($1, $2) RETURNING id',
      values: [User.name, User.email],
    };

    const personResult = await this.startQuery(personQuery);
    return personResult.rows[0].id;
  }

  private async saveSession(personId: number, token: string): Promise<void> {
    const sessionQuery = {
      text: 'INSERT INTO session (person_id, token) VALUES ($1, $2)',
      values: [personId, token],
    };

    await this.startQuery(sessionQuery);
  }

  private async saveCredentials(
    personId: number,
    passwordHash: string,
  ): Promise<void> {
    const credentialsQuery = {
      text: 'INSERT INTO person_credentials (person_id, password_hash) VALUES ($1, $2)',
      values: [personId, passwordHash],
    };

    await this.startQuery(credentialsQuery);
  }

  async saveUser(User: User): Promise<{ message: string }> {
    const personId = await this.savePerson(User);

    await this.saveSession(personId, User.token);
    await this.saveCredentials(personId, User.passwordHash);

    return { message: 'Пользователь успешно создан' };
  }
}
