import { OrderStatus } from '../types/order-status.types.js';

/**
 * Contrato de Interface para a Entidade de Domínio (Domínio Anêmico)
 * Apenas propriedades de dados. Toda a lógica reside nos Use Cases da camada Application.
 */
export interface IOrderEntity {
  id: string;
  customerId: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: Date;
}

