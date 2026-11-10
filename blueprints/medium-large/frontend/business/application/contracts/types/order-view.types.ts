import { z } from 'zod';

/**
 * 1. Tipos Crus Nativos para a View
 */
export interface RawOrderItemView {
  id: string;
  displayPrice: string;
  statusBadge: string;
  canCancel: boolean;
}

/**
 * 2. Schema Zod de validação do modelo de visualização
 */
export const OrderItemViewSchema = z.object({
  id: z.string().min(1),
  displayPrice: z.string().min(1),
  statusBadge: z.string().min(1),
  canCancel: z.boolean(),
});

export const OrderItemViewListSchema = z.array(OrderItemViewSchema);

/**
 * 3. Tipagem inferida exportada junto com o tipo cru
 */
export type OrderItemView = z.infer<typeof OrderItemViewSchema>;

