import { OrderItemView } from '../types/order-view.types.js';

/**
 * Interface contract for Orders Application Service
 */
export interface IOrderApplicationService {
  getOrdersList(): Promise<OrderItemView[]>;
}
