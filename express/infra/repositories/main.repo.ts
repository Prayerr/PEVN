import {
  IQuery,
  IErrorHandler,
  IMainRepository,
} from '../../domain/interfaces';
import { PoolClient, QueryResult } from 'pg';
import { inject, injectable } from 'inversify';

import pool from './pool';

@injectable()
export default class MainRepository implements IMainRepository {
  constructor(@inject('IErrorHandler') private errorHandler: IErrorHandler) {}

  async ensureConnection(): Promise<PoolClient> {
    try {
      const client = await pool.connect();

      if (!client) {
        throw new Error('Отсутствует соединение с базой данных');
      }

      return client;
    } catch (error) {
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка соединения с базой данных',
      );
    }
  }

  async startQuery(query: IQuery): Promise<QueryResult> {
    const client = await this.ensureConnection();
    try {
      await client.query('BEGIN');
      const result = await client.query(query.text, query.values);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      this.errorHandler.errorHandlerRepositories(
        error,
        'Ошибка выполнения запроса',
      );
    } finally {
      client.release();
    }
  }
}
