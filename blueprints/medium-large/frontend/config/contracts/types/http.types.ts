import { z } from 'zod';

/**
 * 1. Raw Native Network Types
 */
export type RawHttpHeaders = Record<string, string>;

/**
 * 2. Generic HTTP Response Zod Schema
 */
export const HttpResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    status: z.number().int(),
  });

/**
 * 3. Exported Inferred & Native Interface
 */
export interface HttpResponse<T> {
  data: T;
  status: number;
}
