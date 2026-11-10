import { AnalyticsProperties } from '../types/analytics.types.js';

/**
 * Contrato de Interface para Facade de Telemetria / Analytics
 */
export interface IAnalyticsFacade {
  trackEvent(name: string, properties?: AnalyticsProperties): void;
}

