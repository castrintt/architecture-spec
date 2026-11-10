import { z } from 'zod';

/**
 * 1. Zod Schemas for Use Case Input and Output
 */
export const CreateOrderInputSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  totalCents: z.number().int().positive('Order total cents must be greater than zero'),
});

export const CreateOrderOutputSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']),
});

/**
 * 2. Inferred and Native Types
 */
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
export type CreateOrderOutput = z.infer<typeof CreateOrderOutputSchema>;
export type RawCreateOrderRequest = { customerId: string; totalCents: number };
