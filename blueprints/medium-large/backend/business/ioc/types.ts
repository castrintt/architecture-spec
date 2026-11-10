/**
 * Tokens de Inversão de Controle com Symbols para o Backend
 */
export const TYPES = {
  // Config / Facades
  DatabaseFacade: Symbol.for('DatabaseFacade'),
  LoggerFacade: Symbol.for('LoggerFacade'),

  // Repositories
  OrderRepository: Symbol.for('OrderRepository'),

  // Application Use Cases
  CreateOrderUseCase: Symbol.for('CreateOrderUseCase'),

  // Controllers
  OrderController: Symbol.for('OrderController'),
} as const;

