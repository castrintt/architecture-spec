import { injectable } from 'inversify';
import { ILoggerFacade } from '../contracts/interfaces/logger-facade.interface.js';
import { LogContext } from '../contracts/types/logger.types.js';

@injectable()
export class JsonLoggerFacade implements ILoggerFacade {
  info(message: string, context?: LogContext): void {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), level: 'info', message, ...context }));
  }

  warn(message: string, context?: LogContext): void {
    console.warn(JSON.stringify({ timestamp: new Date().toISOString(), level: 'warn', message, ...context }));
  }

  error(message: string, error?: Error, context?: LogContext): void {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      errorMessage: error?.message,
      stack: error?.stack,
      ...context,
    }));
  }
}

