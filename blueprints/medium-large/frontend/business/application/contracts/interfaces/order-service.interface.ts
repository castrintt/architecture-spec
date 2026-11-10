import { OrderItemView } from '../types/order-view.types.js';

/**
 * Contrato de Interface para o Serviço de Aplicação de Pedidos
 */
export interface IOrderApplicationService {
  getOrdersList(): Promise<OrderItemView[]>;
}

