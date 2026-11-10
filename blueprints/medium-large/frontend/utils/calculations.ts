/**
 * Pure global utilities agnostic to any framework or UI layer.
 */

export function calculateInstallments(totalAmount: number, installmentsCount: number): number {
  if (installmentsCount <= 0) return totalAmount;
  return Number((totalAmount / installmentsCount).toFixed(2));
}

export function formatCurrency(cents: number, locale = 'en-US', currency = 'USD'): string {
  return (cents / 100).toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
