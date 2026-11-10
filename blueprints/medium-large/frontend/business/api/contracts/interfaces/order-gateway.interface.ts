import { 
  OrderRawDTO, 
  CreateOrderPayload, 
  CreateOrderResponse 
} from '../types/order.types.js';

/**
 * Interface contract for Orders API Gateway
 */
export interface IOrderApiGateway {
  fetchOrders(): Promise<OrderRawDTO[]>;
  createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse>;
}
