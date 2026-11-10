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
 * View Layer (Pure / Dumb Presentation):
 * - Unaware of data source (HTTP, Mock, Cache, or LocalStorage).
 * - Contains zero business rules.
 * - Receives everything via props: 'states' for display and 'actions' for event dispatching.
 * - Perfect for Storybook and visual regression testing.
 */
export function CheckoutView({ states, actions }: CheckoutViewProps) {
  if (states.isSuccess) {
    return (
      <div style={styles.container}>
        <h2>🎉 Order Confirmed!</h2>
        <p>Identifier: <strong>{states.orderId}</strong></p>
        <p>Your payment has been successfully processed.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Finalize Purchase</h2>
        <p style={{ color: '#6B7280', margin: 0 }}>Order #{states.orderId}</p>
      </header>

      <div style={styles.totalRow}>
        <span>Total Due:</span>
        <span>{states.formattedTotal}</span>
      </div>

      {states.errorMessage && (
        <div style={styles.feedbackError}>
          <p>❌ {states.errorMessage}</p>
          <button onClick={actions.handleRetry} style={{ cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Button
          onClick={actions.handleConfirmPayment}
          disabled={states.isProcessing}
          style={{ width: '100%', padding: '12px 0' }}
        >
          {states.isProcessing ? 'Processing Payment...' : 'Confirm & Pay'}
        </Button>
      </div>
    </div>
  );
}
