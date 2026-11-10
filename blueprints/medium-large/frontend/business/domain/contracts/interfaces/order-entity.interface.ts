import { OrderStatus } from '../types/order-status.types.js';

/**
 * Interface contract for Domain Order Entity
 */
export interface IOrderEntity {
  readonly id: string;
  readonly totalCents: number;
  readonly status: OrderStatus;
  canBeCanceled(): boolean;
  cancel(): void;
}
