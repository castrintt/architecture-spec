import { z } from 'zod';

export type LogSeverity = 'info' | 'warn' | 'error';

export interface ValidateSchemaOptions {
  /** Nome identificador da operação ou endpoint (ex: 'OrderApiGateway.fetchOrders') */
  contextName: string;
  /** Severidade a ser aplicada no log em caso de quebra de contrato. Padrão: 'error' */
  severity?: LogSeverity;
  /** Se deve lançar exceção em caso de falha. Padrão: true */
  throwOnError?: boolean;
}

export class SchemaValidationError extends Error {
  constructor(
    public readonly contextName: string,
    public readonly issues: z.ZodIssue[],
    public readonly rawData: unknown
  ) {
    super(`[Contrato Violado em ${contextName}] O payload retornado pela API não respeita o Schema esperado.`);
    this.name = 'SchemaValidationError';
  }
}

/**
 * Função utilitária pura para executar validação com safeParse do Zod
 * embuída com logging estruturado e severidades padronizadas.
 *
 * Localizada na camada mais externa (utils/) para ser acessível a qualquer gateway ou serviço.
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

