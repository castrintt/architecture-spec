/**
 * Backend Inversion of Control Tokens (Symbols)
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
