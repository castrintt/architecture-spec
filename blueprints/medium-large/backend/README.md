# 🟡🔴 Blueprint: Backend for Medium & Large Projects (Clean Architecture with Anemic Domain)

This blueprint mirrors the corporate Frontend architecture, adapted for server-side execution (where there is no View, and the `src/` layer acts as the HTTP Delivery/Presentation layer).

---

## 🎯 Philosophy: Anemic Domain in Clean Architecture

In this architecture, **Domain Entities are anemic** (pure carriers of data and state).
- The entity **contains zero business logic methods** (`order.confirm()`, credit validations, etc.).
- All business rules, orchestration, and state transitions reside exclusively inside **Use Cases** (`business/application/use-cases/`).

---

## 🏗️ Complete Layer Map

```text
backend/
├── business/
│   ├── domain/
│   │   ├── contracts/
│   │   │   ├── interfaces/
│   │   │   │   └── order-entity.interface.ts     # IOrderEntity
│   │   │   └── types/
│   │   │       └── order-status.types.ts         # RawOrderStatus + OrderStatusSchema (Zod)
│   │   └── entities/
│   │       └── order.entity.ts                   # Anemic Entity (Pure state, zero methods)
│   │
│   ├── application/
│   │   ├── contracts/
│   │   │   ├── interfaces/
│   │   │   │   └── create-order-use-case.interface.ts # ICreateOrderUseCase
│   │   │   └── types/
│   │   │       └── create-order.types.ts         # Zod Input/Output schemas + inferred types
│   │   └── use-cases/
│   │       └── create-order.use-case.ts          # Applied business rules
│   │
│   ├── repository/
│   │   ├── contracts/
│   │   │   ├── interfaces/
│   │   │   │   └── order-repository.interface.ts # IOrderRepository (Outbound Port)
│   │   │   └── types/
│   │   │       └── repository.types.ts           # DbOrderRowSchema
│   │   └── repositories/
│   │       └── order.postgres.repository.ts      # Concrete database adapter (PostgreSQL)
│   │
│   └── ioc/
│       ├── types.ts                               # Inversify TYPES tokens (Symbol.for)
│       └── container.ts                           # Inversify Container (binds I... interfaces)
│
├── src/                                           # HTTP Delivery / Presentation Layer
│   ├── controllers/
│   │   └── order.controller.ts                    # Injects UseCase via Inversify + safeParseWithLogging
│   ├── routes/
│   │   └── order.routes.ts                        # REST endpoint registrations
│   ├── middlewares/
│   │   └── auth.middleware.ts                     # Authentication & RBAC guards
│   └── index.ts                                   # Fastify Bootstrap & Healthchecks
│
├── config/                                        # Infrastructure Facades
│   ├── contracts/
│   │   ├── interfaces/
│   │   │   ├── database-facade.interface.ts       # IDatabaseFacade
│   │   │   └── logger-facade.interface.ts         # ILoggerFacade
│   │   └── types/
│   │       ├── database.types.ts
│   │       └── logger.types.ts
│   └── facades/
│       ├── database.facade.ts                     # MockPostgresDatabaseFacade
│       └── logger.facade.ts                       # JsonLoggerFacade
│
└── utils/                                         # Pure Global Utilities
    ├── schema-validator.ts                        # safeParseWithLogging with severities (Zod)
    └── id-generator.ts                            # Domain-prefixed ID generator
```

---

## ⚖️ What Scales vs. What Does NOT Scale

- **What Scales:**
  - **Total Cognitive Symmetry with Frontend:** Developers moving between Front and Back immediately know where files and contracts reside (`business`, `config`, `contracts/interfaces`, `contracts/types`, `utils`).
  - **Frictionless Anemic Domain:** Natural integration with modern relational databases and ORMs (Prisma, Drizzle, Kysely), eliminating object-relational mapping impedance mismatches.
  - **Testability:** Use Cases are 100% unit-testable in pure Node by supplying mocks of `IOrderRepository` and `ILoggerFacade`.
  - **Operational Simplicity:** Runs as a modular monolith in a single container with native ACID transactions.

- **What Does NOT Scale:**
  - Overkill for disposable 1-week prototypes (Tier 1: Small), where a 1-file monolith ships faster.
