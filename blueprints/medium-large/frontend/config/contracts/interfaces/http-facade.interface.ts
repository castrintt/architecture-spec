import { HttpResponse } from '../types/http.types.js';

/**
 * Interface contract for HTTP Facade
 */
export interface IHttpFacade {
  get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}
