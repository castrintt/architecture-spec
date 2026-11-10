import { LogContext } from '../types/logger.types.js';

/**
 * Interface contract for Structured Logging Facade
 */
export interface ILoggerFacade {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
}
