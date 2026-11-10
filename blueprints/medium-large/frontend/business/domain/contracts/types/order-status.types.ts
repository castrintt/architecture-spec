import { z } from 'zod';

/**
 * 1. Tipo Cru Nativo de Status
 */
export type RawOrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';

/**
 * 2. Schema Zod de Status do Pedido
 */
export const OrderStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELED']);

/**
 * 3. Tipo inferido do Zod
 */
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

