/**
 * Funções puras globais agnósticas a qualquer camada.
 */

export function calculateInstallments(totalAmount: number, installmentsCount: number): number {
  if (installmentsCount <= 0) return totalAmount;
  return Number((totalAmount / installmentsCount).toFixed(2));
}

export function formatBRLCurrency(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

