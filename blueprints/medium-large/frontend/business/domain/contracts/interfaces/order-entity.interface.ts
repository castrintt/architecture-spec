import { OrderStatus } from '../types/order-status.types.js';

/**
 * Contrato de Interface para a Entidade de Domínio de Pedido
 */
export interface IOrderEntity {
  readonly id: string;
  readonly totalCents: number;
  readonly status: OrderStatus;
  canBeCanceled(): boolean;
  cancel(): void;
}

