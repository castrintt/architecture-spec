/**
 * InversifyJS Dependency Injection Tokens (Symbols)
 * Prevents tight coupling to concrete classes and allows interface-first injection.
 */
export const TYPES = {
  // Config / Facades
  HttpFacade: Symbol.for('HttpFacade'),
  AnalyticsFacade: Symbol.for('AnalyticsFacade'),

  // Repositories
  LocalCacheRepository: Symbol.for('LocalCacheRepository'),

  // Gateways (API)
  OrderApiGateway: Symbol.for('OrderApiGateway'),

  // Application Services / Use Cases
  OrderApplicationService: Symbol.for('OrderApplicationService'),
} as const;
