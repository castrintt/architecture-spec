import { IOrderEntity } from '../contracts/interfaces/order-entity.interface.js';
import { OrderStatus } from '../contracts/types/order-status.types.js';

/**
 * Entidade de Domínio Anêmica:
 * Portadora de dados e estado puro. Zero regras ou métodos de comportamento.
 * As regras de negócio e transições de estado são governadas exclusivamente
 * pelos Casos de Uso na camada 'business/application/use-cases/'.
 */
export class OrderEntity implements IOrderEntity {
  public id: string;
  public customerId: string;
  public totalCents: number;
  public status: OrderStatus;
  public createdAt: Date;

  constructor(params: {
    id: string;
    customerId: string;
    totalCents: number;
    status: OrderStatus;
    createdAt?: Date;
  }) {
    this.id = params.id;
    this.customerId = params.customerId;
    this.totalCents = params.totalCents;
    this.status = params.status;
    this.createdAt = params.createdAt ?? new Date();
  }
}

