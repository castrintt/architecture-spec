# 🛡️ Security Baseline Guidelines

Non-negotiable security requirements enforced across all project tiers.

---

## 1. Zero Hardcoded Secrets (Startup Environment Validation)

Applications MUST fail fast during bootstrap if mandatory environment variables are missing or malformed. Use strict schema validation (e.g., Zod):

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  API_SECRET_KEY: z.string().min(32),
});

export const env = envSchema.parse(process.env);
```

---

## 2. Principle of Least Privilege & Sanitization

- **Input Sanitization:** Never trust client input. Validate all incoming parameters, query strings, and request bodies.
- **No PII Leaks in Production Logs:** Sensitive data (passwords, credit card numbers, tokens) must be redacted before log emission.
- **Security Headers:** Web backends must configure standard security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options) using middlewares such as Helmet.
