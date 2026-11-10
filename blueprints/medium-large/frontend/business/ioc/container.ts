import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types.js';

// Interfaces (Contratos)
import type { IHttpFacade } from '../../config/contracts/interfaces/http-facade.interface.js';
import type { IAnalyticsFacade } from '../../config/contracts/interfaces/analytics-facade.interface.js';
import type { ILocalCacheRepository } from '../repository/contracts/interfaces/local-cache-repository.interface.js';
import type { IOrderApiGateway } from '../api/contracts/interfaces/order-gateway.interface.js';
import type { IOrderApplicationService } from '../application/contracts/interfaces/order-service.interface.js';

// Implementações Concretas
import { NativeHttpFacade } from '../../config/facades/http.facade.js';
import { ConsoleAnalyticsFacade } from '../../config/facades/analytics.facade.js';
import { LocalStorageRepository } from '../repository/repositories/local-storage.repository.js';
import { OrderApiGateway } from '../api/gateway/order.gateway.js';
import { OrderApplicationService } from '../application/services/order.service.js';

/**
 * Container de Inversão de Controle com InversifyJS:
 * Binda contratos de interface às suas implementações concretas.
 */
const container = new Container();

// 1. Config / Facades (Singletons de infraestrutura)
container.bind<IHttpFacade>(TYPES.HttpFacade).to(NativeHttpFacade).inSingletonScope();
container.bind<IAnalyticsFacade>(TYPES.AnalyticsFacade).to(ConsoleAnalyticsFacade).inSingletonScope();

// 2. Repositories
container.bind<ILocalCacheRepository>(TYPES.LocalCacheRepository).to(LocalStorageRepository).inSingletonScope();

// 3. Gateways (API)
container.bind<IOrderApiGateway>(TYPES.OrderApiGateway).to(OrderApiGateway).inSingletonScope();

// 4. Application Services
container.bind<IOrderApplicationService>(TYPES.OrderApplicationService).to(OrderApplicationService).inSingletonScope();

export { container };
