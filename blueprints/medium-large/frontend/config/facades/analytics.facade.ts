import { injectable } from 'inversify';
import { IAnalyticsFacade } from '../contracts/interfaces/analytics-facade.interface.js';
import { AnalyticsProperties } from '../contracts/types/analytics.types.js';

@injectable()
export class ConsoleAnalyticsFacade implements IAnalyticsFacade {
  trackEvent(name: string, properties?: AnalyticsProperties): void {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[Analytics Track] ${name}`, properties);
    }
  }
}
