import { SqlQueryParams } from '../types/database.types.js';

/**
 * Contrato de Interface para Facade de Banco de Dados
 */
export interface IDatabaseFacade {
  query<T>(sql: string, params?: SqlQueryParams): Promise<T[]>;
  transaction<T>(callback: (trx: IDatabaseFacade) => Promise<T>): Promise<T>;
}

