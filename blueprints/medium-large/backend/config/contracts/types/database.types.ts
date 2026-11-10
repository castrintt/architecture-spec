import { z } from 'zod';

export const SqlQueryParamsSchema = z.array(z.unknown()).optional();
export type SqlQueryParams = z.infer<typeof SqlQueryParamsSchema>;

export type RawDatabaseRow = Record<string, unknown>;

