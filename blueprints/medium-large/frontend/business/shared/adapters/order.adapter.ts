import { OrderEntity } from '../../domain/entities/order.entity.js';
import { OrderRawDTO } from '../../api/contracts/types/order.types.js';
import { IOrderAdapter } from '../contracts/interfaces/order-adapter.interface.js';

/**
 * Adapter Pattern Implementation: transforms API DTOs into Domain Entities.
 */
export class OrderDtoToEntityAdapter implements IOrderAdapter {
  toDomain(dto: OrderRawDTO): OrderEntity {
    return new OrderEntity(dto.id, dto.total_cents, dto.status);
  }

  static toDomain(dto: OrderRawDTO): OrderEntity {
    return new OrderEntity(dto.id, dto.total_cents, dto.status);
  }
}
