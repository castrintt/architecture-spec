import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IOrderRepository } from '../../repository/contracts/interfaces/order-repository.interface.js';
import type { ILoggerFacade } from '../../../config/contracts/interfaces/logger-facade.interface.js';
import { generatePrefixedId } from '../../../utils/id-generator.js';
import { OrderEntity } from '../../domain/entities/order.entity.js';
import { ICreateOrderUseCase } from '../contracts/interfaces/create-order-use-case.interface.js';
import { CreateOrderInput, CreateOrderOutput } from '../contracts/types/create-order.types.js';

/**
 * Use Case: Create Order
 * In an Anemic Domain, validation logic and entity orchestration reside here.
 * The entity is purely a state and data carrier.
 */
@injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
    @inject(TYPES.LoggerFacade) private readonly logger: ILoggerFacade
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    this.logger.info('Initiating order creation', { customerId: input.customerId });

    // Business rule: instantiate anemic entity with initial status PENDING
    const order = new OrderEntity({
      id: generatePrefixedId('ord'),
      customerId: input.customerId,
      totalCents: input.totalCents,
      status: 'PENDING',
    });

    await this.orderRepository.save(order);

    this.logger.info('Order successfully created and saved', { orderId: order.id, status: order.status });

    return {
      orderId: order.id,
      status: order.status,
    };
  }
}
