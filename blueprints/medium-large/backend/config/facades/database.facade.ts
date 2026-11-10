import { injectable } from 'inversify';
import { IDatabaseFacade } from '../contracts/interfaces/database-facade.interface.js';
import { SqlQueryParams } from '../contracts/types/database.types.js';

@injectable()
export class MockPostgresDatabaseFacade implements IDatabaseFacade {
  async query<T>(sql: string, params?: SqlQueryParams): Promise<T[]> {
    console.info(`[DB Exec] ${sql}`, params);
    return [] as T[];
  }

  async transaction<T>(callback: (trx: IDatabaseFacade) => Promise<T>): Promise<T> {
    return callback(this);
  }
}

