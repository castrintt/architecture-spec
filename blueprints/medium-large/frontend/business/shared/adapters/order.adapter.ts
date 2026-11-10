import { OrderEntity } from '../../domain/entities/order.entity.js';
import { OrderRawDTO } from '../../api/contracts/types/order.types.js';
import { IOrderAdapter } from '../contracts/interfaces/order-adapter.interface.js';

/**
 * Camada business/shared/adapters:
 * Implementação do padrão Adapter para converter DTOs de API em Entidades de Domínio.
 */
export class OrderDtoToEntityAdapter implements IOrderAdapter {
  toDomain(dto: OrderRawDTO): OrderEntity {
    return new OrderEntity(dto.id, dto.total_cents, dto.status);
  }

  static toDomain(dto: OrderRawDTO): OrderEntity {
    return new OrderEntity(dto.id, dto.total_cents, dto.status);
  }
}

