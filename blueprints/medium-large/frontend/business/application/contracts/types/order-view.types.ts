import { z } from 'zod';

/**
 * 1. Raw Native Types for the View
 */
export interface RawOrderItemView {
  id: string;
  displayPrice: string;
  statusBadge: string;
  canCancel: boolean;
}

/**
 * 2. Zod Schema validating ViewModel shape
 */
export const OrderItemViewSchema = z.object({
  id: z.string().min(1),
  displayPrice: z.string().min(1),
  statusBadge: z.string().min(1),
  canCancel: z.boolean(),
});

export const OrderItemViewListSchema = z.array(OrderItemViewSchema);

/**
 * 3. Inferred ViewModel Type exported with native type
 */
export type OrderItemView = z.infer<typeof OrderItemViewSchema>;
