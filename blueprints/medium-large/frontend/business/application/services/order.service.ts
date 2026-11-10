import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IOrderApiGateway } from '../../api/contracts/interfaces/order-gateway.interface.js';
import { formatCurrency } from '../../../utils/calculations.js';
import { IOrderApplicationService } from '../contracts/interfaces/order-service.interface.js';
import { OrderItemView } from '../contracts/types/order-view.types.js';

/**
 * Application Service Layer:
 * Orchestrates data between API Gateway and presentation-ready ViewModels.
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
      displayPrice: formatCurrency(item.total_cents),
      statusBadge: item.status === 'CONFIRMED' ? 'Confirmed' : 'Pending',
      canCancel: item.status === 'PENDING',
    }));
  }
}
