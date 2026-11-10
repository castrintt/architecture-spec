# 🟡🔴 Blueprint: Backend para Projetos Médios e Grandes (Clean Architecture com Domínio Anêmico)

Este blueprint reflete a mesma arquitetura do Frontend corporativo, adaptada para o contexto de servidor (onde não existe View, e a camada `src/` atua como entrega/apresentação HTTP).

---

## 🎯 Filosofia: Domínio Anêmico na Clean Architecture

Neste padrão, as **Entidades de Domínio são anêmicas** (portadoras de dados e estado puro). 
- A entidade **não possui métodos de regra de negócio** (`order.confirm()`, validações de crédito, etc.).
- Toda a lógica de negócio, orquestração e transições de estado residem exclusivamente nos **Casos de Uso** (`business/application/use-cases/`).

---

## 🏗️ Mapa Completo de Camadas

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
│   │       └── order.entity.ts                   # Entidade Anêmica (Estado puro, zero métodos)
│   │
│   ├── application/
│   │   ├── contracts/
│   │   │   ├── interfaces/
│   │   │   │   └── create-order-use-case.interface.ts # ICreateOrderUseCase
│   │   │   └── types/
│   │   │       └── create-order.types.ts         # Schemas Zod de Entrada/Saída + Tipagem inferida
│   │   └── use-cases/
│   │       └── create-order.use-case.ts          # Toda a regra de negócio aplicada
│   │
│   ├── repository/
│   │   ├── contracts/
│   │   │   ├── interfaces/
│   │   │   │   └── order-repository.interface.ts # IOrderRepository (Port de saída)
│   │   │   └── types/
│   │   │       └── repository.types.ts           # DbOrderRowSchema
│   │   └── repositories/
│   │       └── order.postgres.repository.ts      # Adaptador concreto de banco (PostgreSQL)
│   │
│   └── ioc/
│       ├── types.ts                               # Tokens de injeção TYPES (Symbol.for)
│       └── container.ts                           # Inversify Container (bind de interfaces I...)
│
├── src/                                           # Camada de Entrega / Apresentação HTTP
│   ├── controllers/
│   │   └── order.controller.ts                    # Injeta UseCase via Inversify + safeParseWithLogging
│   ├── routes/
│   │   └── order.routes.ts                        # Registro de endpoints REST
│   ├── middlewares/
│   │   └── auth.middleware.ts                     # Guards de autenticação e RBAC
│   └── index.ts                                   # Bootstrap Fastify e Healthchecks
│
├── config/                                        # Fachadas (Facades) para infraestrutura
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
└── utils/                                         # Funções puras globais
    ├── schema-validator.ts                        # safeParseWithLogging com severidades (Zod)
    └── id-generator.ts                            # Geração de IDs padronizados de domínio
```

---

## ⚖️ O que escala vs. O que não escala

- **O que escala:**
  - **Simetria Cognitiva Total com o Front:** Quem desenvolve no Front sabe exatamente onde encontrar as coisas no Back (camadas `business`, `config`, `contracts/interfaces`, `contracts/types`, `utils`).
  - **Facilidade com Domínio Anêmico:** Integração natural com bancos de dados relacionais e ORMs (Prisma, Drizzle, Kysely), evitando atrito de mapeamento entre classes ricas e tabelas relacionais.
  - **Testabilidade:** Casos de uso podem ser testados de forma 100% unitária passando mocks das interfaces `IOrderRepository` e `ILoggerFacade`.
  - **Deploy Simples:** Roda como monólito modular em container único com transações ACID.

- **O que NÃO escala:**
  - Se for aplicado a um CRUD descartável de 1 semana (Tier 1: Small), onde o monólito minimalista de 1 arquivo resolve mais rápido.
