# 🟢 Blueprint: Small (Backend - Minimalist Monolith)

Tailored for small projects (MVPs, internal tools, proofs of concept, 1 to 2 developers).

---

## 🎯 Philosophy: Direct Monolithic Files (Symmetry with Frontend Small)

Just as the small frontend leverages single-file components, the small backend **does not implement Clean Architecture, Inversify, or layered Use Cases and Repositories**.

```text
src/
└── index.ts              # Fastify server with direct routing, validation, and persistence
```

---

## ⚖️ What Scales vs. What Does NOT Scale

- **What Scales:**
  - **Ship in hours:** zero dependency injection boilerplate, zero intermediary DTOs or abstract interfaces.
  - **Minimal cost:** runs effortlessly on a \$5 VPS or free serverless container tier.
  - **Instant comprehension:** any developer reads `index.ts` end-to-end in 3 minutes.

- **What Does NOT Scale:**
  - If business logic expands across multiple complex domains or teams exceed 2 developers, lack of layers slows down feature velocity.
