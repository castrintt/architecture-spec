import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IHttpFacade } from '../../../config/contracts/interfaces/http-facade.interface.js';
import { safeParseWithLogging } from '../../../utils/schema-validator.js';
import { IOrderApiGateway } from '../contracts/interfaces/order-gateway.interface.js';
import {
  OrderRawDTO,
  OrderRawListSchema,
  CreateOrderPayload,
  CreateOrderResponse,
  CreateOrderPayloadSchema,
  CreateOrderResponseSchema,
} from '../contracts/types/order.types.js';

/**
 * Orders API Gateway Implementation
 * Validates contracts with Zod and emits structured severity logs.
 */
@injectable()
export class OrderApiGateway implements IOrderApiGateway {
  constructor(
    @inject(TYPES.HttpFacade) private readonly http: IHttpFacade
  ) {}

  async fetchOrders(): Promise<OrderRawDTO[]> {
    const response = await this.http.get<unknown>('/api/orders');

    return safeParseWithLogging(OrderRawListSchema, response.data, {
      contextName: 'OrderApiGateway.fetchOrders',
      severity: 'error',
    });
  }

  async createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    const validatedPayload = safeParseWithLogging(CreateOrderPayloadSchema, payload, {
      contextName: 'OrderApiGateway.createOrder.requestPayload',
      severity: 'error',
    });

    const response = await this.http.post<unknown>('/api/orders', validatedPayload);

    return safeParseWithLogging(CreateOrderResponseSchema, response.data, {
      contextName: 'OrderApiGateway.createOrder.response',
      severity: 'error',
    });
  }
}
