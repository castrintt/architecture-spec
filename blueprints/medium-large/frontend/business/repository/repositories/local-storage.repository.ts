import { injectable } from 'inversify';
import { ILocalCacheRepository } from '../contracts/interfaces/local-cache-repository.interface.js';

@injectable()
export class LocalStorageRepository<T = unknown> implements ILocalCacheRepository<T> {
  get(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  }

  save(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Erro ao salvar no storage local', err);
    }
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}

