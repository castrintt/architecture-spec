/**
 * Interface contract for Local Storage / Cache Repositories
 */
export interface ILocalCacheRepository<T = unknown> {
  get(key: string): T | null;
  save(key: string, value: T): void;
  clear(key: string): void;
}
