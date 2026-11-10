import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IOrderApiGateway } from '../../api/contracts/interfaces/order-gateway.interface.js';
import { formatBRLCurrency } from '../../../utils/calculations.js';
import { IOrderApplicationService } from '../contracts/interfaces/order-service.interface.js';
import { OrderItemView } from '../contracts/types/order-view.types.js';

/**
 * Camada business/application/services:
 * Orquestra o fluxo de dados entre o Gateway da API e o formato tratado para a View.
 */
@injectable()
export class OrderApplicationService implements IOrderApplicationService {
  constructor(
    @inject(TYPES.OrderApiGateway) private readonly orderGateway: IOrderApiGateway
  ) {}

  async getOrdersList(): Promise<OrderItemView[]> {
    const rawList = await this.orderGateway.fetchOrders();

    return rawList.map((item) => ({
      id: item.id,
      displayPrice: formatBRLCurrency(item.total_cents),
      statusBadge: item.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente',
      canCancel: item.status === 'PENDING',
    }));
  }
}

