import { container } from '../../business/ioc/container.js';
import { TYPES } from '../../business/ioc/types.js';
import { OrderController } from '../controllers/order.controller.js';

export function registerOrderRoutes(app: {
  post: (url: string, handler: (req: unknown, reply: { status: (c: number) => { send: (b: unknown) => void } }) => Promise<void>) => void;
}) {
  app.post('/api/orders', async (req, reply) => {
    const controller = container.get<OrderController>(TYPES.OrderController);
    const response = await controller.handleCreate(req as { body: unknown; headers: Record<string, string | undefined> });
    reply.status(response.statusCode).send(response.body);
  });
}
