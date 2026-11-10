import { IOrderEntity } from '../../domain/contracts/interfaces/order-entity.interface.js';

/**
 * Contrato de Interface para o Repositório de Pedidos (Port de Saída)
 */
export interface IOrderRepository {
  save(order: IOrderEntity): Promise<void>;
  findById(id: string): Promise<IOrderEntity | null>;
}

