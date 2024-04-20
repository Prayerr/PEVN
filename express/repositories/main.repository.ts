import { IQuery } from '../interfaces/service.interface';
import pool from '../db/pool';

export default class MainRepository {
  protected async ensureConnection() {
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

  protected async startQuery(query: IQuery) {
    const client = await this.ensureConnection();
    try {
      await client.query('BEGIN');
      const result = await client.query(query.text, query.values);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      const errorDB = new Error(`Ошибка выполнения запроса: ${error.message}`);
      errorDB.code = error.code;
      throw errorDB;
    } finally {
      client.release();
    }
  }
}
