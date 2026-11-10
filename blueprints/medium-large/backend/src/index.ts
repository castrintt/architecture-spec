import Fastify from 'fastify';
import { registerOrderRoutes } from './routes/order.routes.js';

const app = Fastify({ logger: true });

// Healthchecks obrigatórios (Guideline de Observabilidade)
app.get('/health/live', async () => ({ status: 'UP' }));
app.get('/health/ready', async () => ({ status: 'READY', db: 'CONNECTED' }));

// Registro de rotas de negócio
registerOrderRoutes(app);

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Servidor rodando na porta 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

