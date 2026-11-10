import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types.js';

// Contracts (Interfaces)
import type { IDatabaseFacade } from '../../config/contracts/interfaces/database-facade.interface.js';
import type { ILoggerFacade } from '../../config/contracts/interfaces/logger-facade.interface.js';
import type { IOrderRepository } from '../repository/contracts/interfaces/order-repository.interface.js';
import type { ICreateOrderUseCase } from '../application/contracts/interfaces/create-order-use-case.interface.js';

// Concrete Implementations
import { MockPostgresDatabaseFacade } from '../../config/facades/database.facade.js';
import { JsonLoggerFacade } from '../../config/facades/logger.facade.js';
import { OrderPostgresRepository } from '../repository/repositories/order.postgres.repository.js';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case.js';
import { OrderController } from '../../src/controllers/order.controller.js';

/**
 * Backend Inversion of Control Container (InversifyJS)
 */
const container = new Container();

// 1. Infra / Config
container.bind<IDatabaseFacade>(TYPES.DatabaseFacade).to(MockPostgresDatabaseFacade).inSingletonScope();
container.bind<ILoggerFacade>(TYPES.LoggerFacade).to(JsonLoggerFacade).inSingletonScope();

// 2. Repositories
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderPostgresRepository).inSingletonScope();

// 3. Application Use Cases
container.bind<ICreateOrderUseCase>(TYPES.CreateOrderUseCase).to(CreateOrderUseCase).inSingletonScope();

// 4. Controllers (Transient per HTTP request)
container.bind<OrderController>(TYPES.OrderController).to(OrderController).inTransientScope();

export { container };
