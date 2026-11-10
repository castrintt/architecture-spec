import React from 'react';
import { OrderItemView } from '../../business/application/contracts/types/order-view.types.js';
import { Button } from '../design-system/Button.js';
import { theme } from '../globals/theme.js';

interface OrderSummaryProps {
  order: OrderItemView;
  onCancel: (id: string) => void;
}

/**
 * Camada src/components:
 * Componente visual que consome diretamente a OrderItemView preparada pela camada application.
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
        <p style={{ margin: 0, fontWeight: 'bold' }}>Pedido #{order.id}</p>
        <span style={{ color: theme.colors.textMuted, fontSize: '0.875rem' }}>
          Status: {order.statusBadge}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{order.displayPrice}</span>
        {order.canCancel && (
          <Button variant="danger" onClick={() => onCancel(order.id)}>
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}

