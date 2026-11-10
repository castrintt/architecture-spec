import { z } from 'zod';

export const AnalyticsPropertiesSchema = z.record(z.string(), z.unknown());

export type AnalyticsProperties = z.infer<typeof AnalyticsPropertiesSchema>;
export type RawAnalyticsEvent = { name: string; properties?: Record<string, unknown> };
