import React from 'react';
import { styles } from './checkout.styles.js';
import { Button } from '../../design-system/Button.js';

export interface CheckoutViewProps {
  states: {
    orderId: string;
    formattedTotal: string;
    isProcessing: boolean;
    errorMessage: string | null;
    isSuccess: boolean;
  };
  actions: {
    handleConfirmPayment: () => void;
    handleRetry: () => void;
  };
}

/**
 * Camada View (Apresentação Pura / Burra):
 * - Não sabe de onde vêm os dados (se é HTTP, Mock, Storage ou Cache).
 * - Não possui regras de negócio.
 * - Recebe tudo via props: 'states' para exibição e 'actions' para eventos.
 * - Perfeita para Storybook e testes de regressão visual.
 */
export function CheckoutView({ states, actions }: CheckoutViewProps) {
  if (states.isSuccess) {
    return (
      <div style={styles.container}>
        <h2>🎉 Pedido Confirmado!</h2>
        <p>Identificador: <strong>{states.orderId}</strong></p>
        <p>Seu pagamento foi aprovado com sucesso.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Finalizar Compra</h2>
        <p style={{ color: '#6B7280', margin: 0 }}>Pedido #{states.orderId}</p>
      </header>

      <div style={styles.totalRow}>
        <span>Total a Pagar:</span>
        <span>{states.formattedTotal}</span>
      </div>

      {states.errorMessage && (
        <div style={styles.feedbackError}>
          <p>❌ {states.errorMessage}</p>
          <button onClick={actions.handleRetry} style={{ cursor: 'pointer' }}>
            Tentar novamente
          </button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Button
          onClick={actions.handleConfirmPayment}
          disabled={states.isProcessing}
          style={{ width: '100%', padding: '12px 0' }}
        >
          {states.isProcessing ? 'Processando...' : 'Confirmar e Pagar'}
        </Button>
      </div>
    </div>
  );
}

