import { SqlQueryParams } from '../types/database.types.js';

/**
 * Interface contract for Database Facade
 */
export interface IDatabaseFacade {
  query<T>(sql: string, params?: SqlQueryParams): Promise<T[]>;
  transaction<T>(callback: (trx: IDatabaseFacade) => Promise<T>): Promise<T>;
}
