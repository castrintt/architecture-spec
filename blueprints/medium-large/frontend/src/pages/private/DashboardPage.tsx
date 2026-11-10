import React, { useEffect, useState } from 'react';
import { container } from '../../business/ioc/container.js';
import { TYPES } from '../../business/ioc/types.js';
import type { IOrderApplicationService } from '../../business/application/contracts/interfaces/order-service.interface.js';
import type { OrderItemView } from '../../business/application/contracts/types/order-view.types.js';
import { OrderSummary } from '../../components/OrderSummary.js';
import { useAuthContext } from '../../hooks/use-auth-context.js';
import { canActivatePrivate } from '../../guards/auth.guard.js';

/**
 * Camada src/pages (Privada):
 * Protegida por Guard e orquestrada consumindo a service resolvida via Inversify Container.
 */
export function DashboardPage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<OrderItemView[]>([]);
  const isAuthorized = canActivatePrivate();

  useEffect(() => {
    if (isAuthorized) {
      // Resolução via contrato de interface no InversifyJS
      const orderService = container.get<IOrderApplicationService>(TYPES.OrderApplicationService);
      orderService.getOrdersList().then(setOrders).catch(console.error);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <div style={{ padding: 40, color: 'red' }}>Acesso não autorizado. Faça login primeiro.</div>;
  }

  const handleCancel = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Painel Operacional</h1>
      <p>Bem-vindo, <strong>{user?.name}</strong></p>

      <h3>Seus Pedidos</h3>
      {orders.length === 0 ? (
        <p>Nenhum pedido carregado.</p>
      ) : (
        orders.map((order) => (
          <OrderSummary key={order.id} order={order} onCancel={handleCancel} />
        ))
      )}
    </div>
  );
}
