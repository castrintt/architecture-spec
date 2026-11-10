import { z } from 'zod';

export const StorageKeySchema = z.string().min(1, 'Storage key cannot be empty');
export type StorageKey = z.infer<typeof StorageKeySchema>;
export type RawStoragePayload = Record<string, unknown> | string | number | boolean;
