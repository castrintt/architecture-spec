import { OrderEntity } from '../../domain/entities/order.entity.js';
import { OrderRawDTO } from '../../api/contracts/types/order.types.js';

/**
 * Interface contract for Order Adapters
 */
export interface IOrderAdapter {
  toDomain(dto: OrderRawDTO): OrderEntity;
}
