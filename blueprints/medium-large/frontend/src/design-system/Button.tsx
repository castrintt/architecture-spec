import React from 'react';
import { theme } from '../globals/theme.js';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

/**
 * Design System Base Component:
 * Reusable across any View layer.
 */
export function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
  const bg = variant === 'danger' ? theme.colors.danger : theme.colors.primary;

  return (
    <button
      style={{
        backgroundColor: bg,
        color: '#FFF',
        border: 'none',
        borderRadius: 4,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
