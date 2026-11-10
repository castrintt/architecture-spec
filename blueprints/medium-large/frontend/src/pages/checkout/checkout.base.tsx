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
 * Camada Base (Composition Root / Container de Injeção):
 * - É o arquivo consumido pela tabela de rotas ('src/routes/routes.ts').
 * - Resolve dependências a partir do container InversifyJS ('business/ioc/container.ts').
 * - Injeta instâncias no Controller e envelopa a View passando 'states' e 'actions'.
 */
export function CheckoutBase({ orderId = 'ord_9876', totalCents = 15990 }: CheckoutBaseProps) {
  // Resolve o gateway via contrato de interface no Inversify Container
  const orderGateway = container.get<IOrderApiGateway>(TYPES.OrderApiGateway);

  // Adaptador de serviço conectando o gateway ao controller
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
      console.info(`[Payment Flow] Transação aprovada: ${trxId}`);
    },
  });

  return <CheckoutView states={states} actions={actions} />;
}

export default CheckoutBase;
