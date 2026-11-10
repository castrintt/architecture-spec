/**
 * Tokens de Injeção do InversifyJS (Symbols):
 * Evitam acoplamento direto com as classes concretas, permitindo
 * injetar abstrações/interfaces em qualquer lugar da aplicação.
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

