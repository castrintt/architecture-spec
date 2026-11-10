import React from 'react';

/**
 * Camada de Estilos da Página:
 * Pode ser adaptada para styled-components, Tailwind ou CSS Modules.
 * Exporta estilos diretamente para consumo na View sem necessidade de injeção.
 */
export const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 24,
    fontFamily: 'sans-serif',
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
  } as React.CSSProperties,

  header: {
    borderBottom: '1px solid #F3F4F6',
    paddingBottom: 16,
    marginBottom: 24,
  } as React.CSSProperties,

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    margin: '20px 0',
  } as React.CSSProperties,

  feedbackError: {
    color: '#EF4444',
    fontSize: '0.875rem',
    marginTop: 8,
  } as React.CSSProperties,
};

