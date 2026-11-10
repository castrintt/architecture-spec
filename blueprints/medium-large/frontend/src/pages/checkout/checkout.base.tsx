import React from 'react';
import { useCheckoutController } from './checkout.controller.js';
import { CheckoutView } from './checkout.view.js';
import { container } from '../../business/ioc/container.js';
import { TYPES } from '../../business/ioc/types.js';
import type { IOrderApiGateway } from '../../business/api/contracts/interfaces/order-gateway.interface.js';

interface CheckoutBaseProps {
  orderId?: string;
  totalCents?: number;
}

/**
 * Base Component (Composition Root / Injection Container):
 * - Consumed by the routing table ('src/routes/routes.ts').
 * - Resolves interface dependencies from InversifyJS container.
 * - Injects instances into the Controller and wraps the View passing 'states' and 'actions'.
 */
export function CheckoutBase({ orderId = 'ord_9876', totalCents = 15990 }: CheckoutBaseProps) {
  const orderGateway = container.get<IOrderApiGateway>(TYPES.OrderApiGateway);

  const serviceAdapter = {
    confirmPayment: async (id: string) => {
      await orderGateway.createOrder({ items: [{ id, qty: 1 }] });
      return { success: true, transactionId: 'trx_' + id };
    },
  };

  const { states, actions } = useCheckoutController({
    orderId,
    totalCents,
    service: serviceAdapter,
    onPaymentSuccess: (trxId) => {
      console.info(`[Payment Flow] Transaction approved: ${trxId}`);
    },
  });

  return <CheckoutView states={states} actions={actions} />;
}

export default CheckoutBase;
