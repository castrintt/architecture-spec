import { AnalyticsProperties } from '../types/analytics.types.js';

/**
 * Interface contract for Telemetry / Analytics Facade
 */
export interface IAnalyticsFacade {
  trackEvent(name: string, properties?: AnalyticsProperties): void;
}
