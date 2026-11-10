import { z } from 'zod';

/**
 * 1. Tipo Cru Nativo de Status
 */
export type RawOrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';

/**
 * 2. Schema Zod de Validação de Status
 */
export const OrderStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELED']);

/**
 * 3. Tipagem inferida exportada junto com o tipo cru
 */
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

