import React, { useEffect, useState } from 'react';
import { container } from '../../business/ioc/container.js';
import { TYPES } from '../../business/ioc/types.js';
import type { IOrderApplicationService } from '../../business/application/contracts/interfaces/order-service.interface.js';
import type { OrderItemView } from '../../business/application/contracts/types/order-view.types.js';
import { OrderSummary } from '../../components/OrderSummary.js';
import { useAuthContext } from '../../hooks/use-auth-context.js';
import { canActivatePrivate } from '../../guards/auth.guard.js';

/**
 * Private Page: Dashboard
 * Protected by authorization guard and resolves application service via InversifyJS.
 */
export function DashboardPage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<OrderItemView[]>([]);
  const isAuthorized = canActivatePrivate();

  useEffect(() => {
    if (isAuthorized) {
      const orderService = container.get<IOrderApplicationService>(TYPES.OrderApplicationService);
      orderService.getOrdersList().then(setOrders).catch(console.error);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <div style={{ padding: 40, color: 'red' }}>Unauthorized access. Please sign in first.</div>;
  }

  const handleCancel = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Operational Dashboard</h1>
      <p>Welcome, <strong>{user?.name}</strong></p>

      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders loaded.</p>
      ) : (
        orders.map((order) => (
          <OrderSummary key={order.id} order={order} onCancel={handleCancel} />
        ))
      )}
    </div>
  );
}
