/**
 * Contrato de Interface para Repositórios de Cache Local / Storage
 */
export interface ILocalCacheRepository<T = unknown> {
  get(key: string): T | null;
  save(key: string, value: T): void;
  clear(key: string): void;
}

