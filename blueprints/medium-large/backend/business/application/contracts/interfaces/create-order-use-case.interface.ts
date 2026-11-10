import { CreateOrderInput, CreateOrderOutput } from '../types/create-order.types.js';

/**
 * Contrato de Interface para o Caso de Uso de Criação de Pedido
 */
export interface ICreateOrderUseCase {
  execute(input: CreateOrderInput): Promise<CreateOrderOutput>;
}

