import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IOrderRepository } from '../../repository/contracts/interfaces/order-repository.interface.js';
import type { ILoggerFacade } from '../../../config/contracts/interfaces/logger-facade.interface.js';
import { generatePrefixedId } from '../../../utils/id-generator.js';
import { OrderEntity } from '../../domain/entities/order.entity.js';
import { ICreateOrderUseCase } from '../contracts/interfaces/create-order-use-case.interface.js';
import { CreateOrderInput, CreateOrderOutput } from '../contracts/types/create-order.types.js';

/**
 * Caso de Uso: Criação de Pedido
 * Como o domínio é ANÊMICO, as regras de validação de fluxo e a orquestração
 * da entidade residem aqui. A entidade é apenas um portador de estado.
 */
@injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
    @inject(TYPES.LoggerFacade) private readonly logger: ILoggerFacade
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    this.logger.info('Iniciando criação de pedido', { customerId: input.customerId });

    // Regra de Negócio: criação da entidade anêmica com estado inicial PENDING
    const order = new OrderEntity({
      id: generatePrefixedId('ord'),
      customerId: input.customerId,
      totalCents: input.totalCents,
      status: 'PENDING',
    });

    await this.orderRepository.save(order);

    this.logger.info('Pedido salvo com sucesso', { orderId: order.id, status: order.status });

    return {
      orderId: order.id,
      status: order.status,
    };
  }
}

