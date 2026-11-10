import { z } from 'zod';

/**
 * 1. Tipo nativo cru (Payload HTTP)
 */
export type RawHttpHeaders = Record<string, string>;

/**
 * 2. Schema Zod de Resposta HTTP Genérica
 */
export const HttpResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    status: z.number().int(),
  });

/**
 * 3. Tipos inferidos e nativos exportados
 */
export interface HttpResponse<T> {
  data: T;
  status: number;
}

