import { IOrderEntity } from '../../domain/contracts/interfaces/order-entity.interface.js';

/**
 * Interface contract for Orders Repository (Outbound Port)
 */
export interface IOrderRepository {
  save(order: IOrderEntity): Promise<void>;
  findById(id: string): Promise<IOrderEntity | null>;
}
