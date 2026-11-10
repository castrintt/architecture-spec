import { CreateOrderInput, CreateOrderOutput } from '../types/create-order.types.js';

/**
 * Interface contract for Create Order Use Case
 */
export interface ICreateOrderUseCase {
  execute(input: CreateOrderInput): Promise<CreateOrderOutput>;
}
