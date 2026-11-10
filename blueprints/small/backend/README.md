# 🟢 Blueprint: Small (Backend - Monólito Minimalista)

Projetos pequenos (MVPs, ferramentas internas, 1 a 2 desenvolvedores).

---

## 🎯 Filosofia: Monólito em Arquivos Diretos (Simetria com o Front Small)

Assim como no frontend pequeno temos o componente single-file, no backend pequeno **não utilizamos separação de Clean Architecture, Inversify ou camadas de Use Cases e Repositórios**.

```text
src/
└── index.ts              # Servidor Fastify com rotas, validação e persistência direta
```

---

## ⚖️ O que escala vs. O que não escala

- **O que escala:**
  - **Entrega em poucas horas:** sem cerimônia de inversão de controle, DTOs intermediários ou interfaces.
  - **Custo mínimo:** roda em 1 container de $5 ou serverless direto.
  - **Entendimento instantâneo:** qualquer dev lê o arquivo `index.ts` de ponta a ponta em 3 minutos.

- **O que NÃO escala:**
  - Se a regra de negócio crescer para múltiplos domínios ou se o time passar de 2 devs, a falta de camadas começa a dificultar a manutenção.
