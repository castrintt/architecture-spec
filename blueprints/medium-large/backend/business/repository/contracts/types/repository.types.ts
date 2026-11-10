import { z } from 'zod';

export const DbOrderRowSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  total_cents: z.number().int(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED']),
  created_at: z.date().or(z.string()),
});

export type DbOrderRow = z.infer<typeof DbOrderRowSchema>;
