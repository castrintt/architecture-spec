import { z } from 'zod';

export type LogSeverity = 'info' | 'warn' | 'error';

export interface ValidateSchemaOptions {
  /** Identifier name for the operation or endpoint (e.g. 'OrderApiGateway.fetchOrders') */
  contextName: string;
  /** Severity level to apply in logs upon contract violation. Default: 'error' */
  severity?: LogSeverity;
  /** Whether to throw an error on contract failure. Default: true */
  throwOnError?: boolean;
}

export class SchemaValidationError extends Error {
  constructor(
    public readonly contextName: string,
    public readonly issues: z.ZodIssue[],
    public readonly rawData: unknown
  ) {
    super(`[Contract Violation in ${contextName}] The payload returned does not respect the expected Zod Schema.`);
    this.name = 'SchemaValidationError';
  }
}

/**
 * Pure utility function to execute Zod safeParse validation
 * embedded with structured logging and standardized severities.
 *
 * Located in the outermost layer (utils/) to be accessible to any gateway or service.
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
      type: 'API_CONTRACT_VIOLATION',
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
