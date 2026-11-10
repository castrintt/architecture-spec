import Fastify from 'fastify';

/**
 * Padrão Monólito Direto (Tier 1: Small):
 * Em projetos pequenos, a rota HTTP, a validação de dados e a persistência
 * residem no MESMO arquivo. Sem Inversify, sem camadas de use-cases ou repositories.
 */
const app = Fastify({ logger: true });

// Estado / Persistência em memória ou SQLite direto
const items = [
  { id: 'item_1', title: 'Item Exemplo A', price: 99.9 },
  { id: 'item_2', title: 'Item Exemplo B', price: 149.0 },
];

app.get('/health/live', async () => ({ status: 'UP' }));

app.get('/api/items', async () => items);

app.post('/api/items', async (req, reply) => {
  const body = req.body as { title?: string; price?: number };

  if (!body.title || typeof body.price !== 'number' || body.price <= 0) {
    return reply.status(400).send({
      type: 'https://api.empresa.com/errors/invalid-payload',
      title: 'Payload inválido',
      status: 400,
      detail: 'Título e preço positivo são obrigatórios',
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
