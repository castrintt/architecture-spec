import { OrderStatus } from '../types/order-status.types.js';

/**
 * Interface contract for Domain Entity (Anemic Domain Pattern)
 * Contains pure data attributes. All logic resides in Use Cases inside Application layer.
 */
export interface IOrderEntity {
  id: string;
  customerId: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: Date;
}
