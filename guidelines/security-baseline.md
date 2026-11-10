# 🛡️ Diretrizes de Segurança (Security Baseline)

Padrões inegociáveis de segurança que o Wizard deve injetar em qualquer novo projeto gerado.

---

## 1. Zero Hardcoded Secrets (Validação de Ambiente em Startup)

Qualquer aplicação DEVE falhar imediatamente no bootstrap (`Fail Fast`) se variáveis obrigatórias estiverem ausentes. Utilize validadores de schema como Zod:

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

## 2. Princípio do Menor Privilégio & Least Exposure

- **Sanitização de Input:** Nunca confie em dados recebidos do cliente. Toda entrada deve passar por validação de tipo e limites de tamanho.
- **Não vazar PII ou Stacktraces:** Em produção, logs devem mascarar dados sensíveis (senhas, CPFs, tokens).
- **Headers HTTP de Segurança:** Todo backend web deve utilizar `helmet` (ou equivalente na linguagem adotada) para ativar CSP, HSTS, X-Content-Type-Options e X-Frame-Options.

