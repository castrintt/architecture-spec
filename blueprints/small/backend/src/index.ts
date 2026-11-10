import Fastify from 'fastify';

/**
 * Direct Monolith Pattern (Tier 1: Small):
 * In small projects, HTTP routes, payload validation, and persistence
 * reside in the SAME file. No Inversify, no Use Case or Repository layers.
 */
const app = Fastify({ logger: true });

// In-memory or direct SQLite/Postgres persistence
const items = [
  { id: 'item_1', title: 'Sample Item A', price: 99.9 },
  { id: 'item_2', title: 'Sample Item B', price: 149.0 },
];

app.get('/health/live', async () => ({ status: 'UP' }));

app.get('/api/items', async () => items);

app.post('/api/items', async (req, reply) => {
  const body = req.body as { title?: string; price?: number };

  if (!body.title || typeof body.price !== 'number' || body.price <= 0) {
    return reply.status(400).send({
      type: 'https://api.company.com/errors/invalid-payload',
      title: 'Invalid Payload',
      status: 400,
      detail: 'Title and positive price are required',
    });
  }

  const newItem = { id: `item_${Date.now()}`, title: body.title, price: body.price };
  items.push(newItem);

  return reply.status(201).send(newItem);
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
