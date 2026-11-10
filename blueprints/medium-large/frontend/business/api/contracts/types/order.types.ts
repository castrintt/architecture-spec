import { z } from 'zod';

/**
 * 1. Tipos Crus Nativos (Formato bruto que trafega na rede)
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
 * 2. Schemas Zod de Validação de Contrato
 */
export const OrderRawDtoSchema = z.object({
  id: z.string().min(1, 'ID do pedido é obrigatório'),
  total_cents: z.number().int().nonnegative('Valor total em centavos deve ser inteiro não-negativo'),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']),
  created_at: z.string().datetime({ message: 'Data de criação deve ser formato ISO 8601' }),
});

export const OrderRawListSchema = z.array(OrderRawDtoSchema);

export const CreateOrderPayloadSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().min(1),
      qty: z.number().int().positive(),
    })
  ).min(1, 'Lista de itens não pode ser vazia'),
});

export const CreateOrderResponseSchema = z.object({
  orderId: z.string().min(1, 'orderId retornado é inválido'),
});

/**
 * 3. Conversão e Tipagem Inferida do Zod (Exportando ambos: nativo e inferido)
 */
export type OrderRawDTO = z.infer<typeof OrderRawDtoSchema>;
export type CreateOrderPayload = z.infer<typeof CreateOrderPayloadSchema>;
export type CreateOrderResponse = z.infer<typeof CreateOrderResponseSchema>;

