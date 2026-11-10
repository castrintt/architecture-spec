import { z } from 'zod';

/**
 * 1. Raw Native Status Type
 */
export type RawOrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';

/**
 * 2. Zod Status Validation Schema
 */
export const OrderStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'CANCELED']);

/**
 * 3. Inferred Zod Type
 */
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
