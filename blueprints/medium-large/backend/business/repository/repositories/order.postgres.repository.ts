import { injectable, inject } from 'inversify';
import { TYPES } from '../../ioc/types.js';
import type { IDatabaseFacade } from '../../../config/contracts/interfaces/database-facade.interface.js';
import { IOrderRepository } from '../contracts/interfaces/order-repository.interface.js';
import { IOrderEntity } from '../../domain/contracts/interfaces/order-entity.interface.js';
import { OrderEntity } from '../../domain/entities/order.entity.js';
import { DbOrderRow } from '../contracts/types/repository.types.js';

@injectable()
export class OrderPostgresRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.DatabaseFacade) private readonly db: IDatabaseFacade
  ) {}

  async save(order: IOrderEntity): Promise<void> {
    await this.db.query(
      `INSERT INTO orders (id, customer_id, total_cents, status, created_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET status = $4`,
      [order.id, order.customerId, order.totalCents, order.status, order.createdAt]
    );
  }

  async findById(id: string): Promise<IOrderEntity | null> {
    const rows = await this.db.query<DbOrderRow>(
      `SELECT id, customer_id, total_cents, status, created_at FROM orders WHERE id = $1`,
      [id]
    );

    const row = rows[0];
    if (!row) return null;

    return new OrderEntity({
      id: row.id,
      customerId: row.customer_id,
      totalCents: row.total_cents,
      status: row.status,
      createdAt: new Date(row.created_at),
    });
  }
}
