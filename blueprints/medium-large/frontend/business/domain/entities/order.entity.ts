import { IOrderEntity } from '../contracts/interfaces/order-entity.interface.js';
import { OrderStatus } from '../contracts/types/order-status.types.js';

/**
 * Camada business/domain/entities:
 * Entidade de Domínio que implementa IOrderEntity.
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
      throw new Error('Apenas pedidos pendentes podem ser cancelados.');
    }
    this._status = 'CANCELED';
  }
}

