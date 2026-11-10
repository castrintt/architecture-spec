import { z } from 'zod';

/**
 * 1. Raw Native Network Payloads
 */
export interface RawOrderResponsePayload {
  id: string;
  total_cents: number;
  status: string;
  created_at: string;
}

export interface RawCreateOrderPayload {
  items: Array<{ id: string; qty: number }>;
}

export interface RawCreateOrderResponse {
  orderId: string;
}

/**
 * 2. Zod Contract Validation Schemas
 */
export const OrderRawDtoSchema = z.object({
  id: z.string().min(1, 'Order ID is required'),
  total_cents: z.number().int().nonnegative('Total cents must be non-negative integer'),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']),
  created_at: z.string().datetime({ message: 'Created at must be in ISO 8601 format' }),
});

export const OrderRawListSchema = z.array(OrderRawDtoSchema);

export const CreateOrderPayloadSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      qty: z.number().int().positive(),
    })
  ).min(1, 'Items list cannot be empty'),
});

export const CreateOrderResponseSchema = z.object({
  orderId: z.string().min(1, 'Returned orderId is invalid'),
});

/**
 * 3. Inferred and Native Types (Both exported)
 */
export type OrderRawDTO = z.infer<typeof OrderRawDtoSchema>;
export type CreateOrderPayload = z.infer<typeof CreateOrderPayloadSchema>;
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>;
