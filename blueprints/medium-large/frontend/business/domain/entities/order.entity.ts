import { IOrderEntity } from '../contracts/interfaces/order-entity.interface.js';
import { OrderStatus } from '../contracts/types/order-status.types.js';

/**
 * Domain Order Entity Implementation
 */
export class OrderEntity implements IOrderEntity {
  constructor(
    public readonly id: string,
    public readonly totalCents: number,
    private _status: OrderStatus
  ) {}

  get status(): OrderStatus {
    return this._status;
  }

  canBeCanceled(): boolean {
    return this._status === 'PENDING';
  }

  cancel(): void {
    if (!this.canBeCanceled()) {
      throw new Error('Only pending orders can be canceled.');
    }
    this._status = 'CANCELED';
  }
}
