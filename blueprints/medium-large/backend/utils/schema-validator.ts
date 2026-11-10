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
    super(`[Contrato Violado em ${contextName}] O payload não respeita o Schema Zod esperado.`);
    this.name = 'SchemaValidationError';
  }
}

/**
 * Função utilitária pura para executar safeParse do Zod com logging estruturado
 * e severidades no Backend. Localizada em utils/ na camada mais externa.
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
      console.warn(`⚠️ [${contextName}] Divergência no Schema Zod detectada:`, JSON.stringify(errorDetails));
    } else {
      console.error(`🚨 [${contextName}] Falha Crítica de Contrato Zod detectada:`, JSON.stringify(errorDetails));
    }

    if (throwOnError) {
      throw new SchemaValidationError(contextName, result.error.issues, data);
    }
  }

  return (result as { success: true; data: T }).data;
}

