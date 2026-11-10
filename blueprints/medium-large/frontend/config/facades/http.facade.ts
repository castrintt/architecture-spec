import { injectable } from 'inversify';
import { IHttpFacade } from '../contracts/interfaces/http-facade.interface.js';
import { HttpResponse } from '../contracts/types/http.types.js';

@injectable()
export class NativeHttpFacade implements IHttpFacade {
  constructor(private readonly baseUrl: string = '') {}

  async get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...headers },
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return { data: (await res.json()) as T, status: res.status };
  }

  async post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return { data: (await res.json()) as T, status: res.status };
  }
}
