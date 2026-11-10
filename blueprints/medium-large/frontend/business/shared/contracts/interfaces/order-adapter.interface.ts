import { OrderEntity } from '../../domain/entities/order.entity.js';
import { OrderRawDTO } from '../../api/contracts/types/order.types.js';

/**
 * Contrato de Interface para Adaptadores de Pedido
 */
export interface IOrderAdapter {
  toDomain(dto: OrderRawDTO): OrderEntity;
}

