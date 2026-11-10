import React from 'react';
import { OrderItemView } from '../../business/application/contracts/types/order-view.types.js';
import { Button } from '../design-system/Button.js';
import { theme } from '../globals/theme.js';

interface OrderSummaryProps {
  order: OrderItemView;
  onCancel: (id: string) => void;
}

/**
 * Composite UI Component rendering an OrderItemView prepared by the Application layer.
 */
export function OrderSummary({ order, onCancel }: OrderSummaryProps) {
  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 8,
        padding: theme.spacing.md,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
      }}
    >
      <div>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Order #{order.id}</p>
        <span style={{ color: theme.colors.textMuted, fontSize: '0.875rem' }}>
          Status: {order.statusBadge}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{order.displayPrice}</span>
        {order.canCancel && (
          <Button variant="danger" onClick={() => onCancel(order.id)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
