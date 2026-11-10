import crypto from 'node:crypto';

/**
 * Pure utility to generate standardized domain-prefixed IDs.
 */
export function generatePrefixedId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`;
}
