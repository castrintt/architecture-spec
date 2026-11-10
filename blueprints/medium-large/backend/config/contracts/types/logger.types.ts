import { z } from 'zod';

export const LogContextSchema = z.record(z.string(), z.unknown()).optional();
export type LogContext = z.infer<typeof LogContextSchema>;

export interface RawLogPayload {
  level: string;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}
