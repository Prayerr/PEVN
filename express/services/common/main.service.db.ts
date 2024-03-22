import pool from '../../db/pool';
import IQuery from '../../interfaces/query.interface';

export default class MainServiceDB {
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

  protected async startQuery(IQuery: IQuery) {
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
}
