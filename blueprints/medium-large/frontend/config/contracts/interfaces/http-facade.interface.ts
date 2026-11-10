import { HttpResponse } from '../types/http.types.js';

/**
 * Contrato de Interface para Facade HTTP
 */
export interface IHttpFacade {
  get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>>;
  post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<HttpResponse<T>>;
}

