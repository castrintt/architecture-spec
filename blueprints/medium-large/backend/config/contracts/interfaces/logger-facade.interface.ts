import { LogContext } from '../types/logger.types.js';

/**
 * Contrato de Interface para Facade de Logging Estruturado
 */
export interface ILoggerFacade {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
}

