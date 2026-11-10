import { z } from 'zod';

export type LogSeverity = 'info' | 'warn' | 'error';

export interface ValidateSchemaOptions {
  contextName: string;
  severity?: LogSeverity;
  throwOnError?: boolean;
}

export class SchemaValidationError extends Error {
  constructor(
    public readonly contextName: string,
    public readonly issues: z.ZodIssue[],
    public readonly rawData: unknown
  ) {
    super(`[Contract Violation in ${contextName}] Payload violates expected Zod Schema.`);
    this.name = 'SchemaValidationError';
  }
}

/**
 * Pure utility function to execute Zod safeParse with structured logging
 * and severity levels. Located in utils/ at the outermost layer.
 */
export function safeParseWithLogging<T>(
  schema: z.ZodType<T>,
  data: unknown,
  options: ValidateSchemaOptions
): T {
  const { contextName, severity = 'error', throwOnError = true } = options;

  const result = schema.safeParse(data);

  if (!result.success) {
    const errorDetails = {
      timestamp: new Date().toISOString(),
      level: severity,
      type: 'SCHEMA_CONTRACT_VIOLATION',
      context: contextName,
      issues: result.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
        code: i.code,
      })),
      rawData: typeof data === 'object' ? data : String(data),
    };

    if (severity === 'warn') {
      console.warn(`⚠️ [${contextName}] Zod Schema Divergence Detected:`, JSON.stringify(errorDetails));
    } else {
      console.error(`🚨 [${contextName}] Critical Zod Contract Failure Detected:`, JSON.stringify(errorDetails));
    }

    if (throwOnError) {
      throw new SchemaValidationError(contextName, result.error.issues, data);
    }
  }

  return (result as { success: true; data: T }).data;
}
