import { z } from 'zod';

export const StorageKeySchema = z.string().min(1, 'Chave de storage não pode ser vazia');
export type StorageKey = z.infer<typeof StorageKeySchema>;
export type RawStoragePayload = Record<string, unknown> | string | number | boolean;

