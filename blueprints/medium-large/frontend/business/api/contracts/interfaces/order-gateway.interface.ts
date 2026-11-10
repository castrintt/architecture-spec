import { 
  OrderRawDTO, 
  CreateOrderPayload, 
  CreateOrderResponse 
} from '../types/order.types.js';

/**
 * Contrato de Interface para o Gateway da API de Pedidos
 */
export interface IOrderApiGateway {
  fetchOrders(): Promise<OrderRawDTO[]>;
  createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse>;
}

