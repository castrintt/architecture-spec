import crypto from 'node:crypto';

/**
 * Utilitário puro de geração de IDs padronizados com prefixo de domínio.
 */
export function generatePrefixedId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`;
}

