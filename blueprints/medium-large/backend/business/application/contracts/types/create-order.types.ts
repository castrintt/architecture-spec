import { z } from 'zod';

/**
 * 1. Schemas Zod de Entrada e Saída do Caso de Uso
 */
export const CreateOrderInputSchema = z.object({
  customerId: z.string().min(1, 'ID do cliente é obrigatório'),
  totalCents: z.number().int().positive('O valor total do pedido deve ser maior que zero'),
});

export const CreateOrderOutputSchema = z.object({
  orderId: z.string().min(1),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']),
});

/**
 * 2. Tipagem inferida exportada junto com tipos nativos
 */
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
export type CreateOrderOutput = z.infer<typeof CreateOrderOutputSchema>;
export type RawCreateOrderRequest = { customerId: string; totalCents: number };

