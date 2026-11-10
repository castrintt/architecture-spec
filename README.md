# 🏛️ Architecture Decision Catalog & Blueprints

> **Corporate Architectural Reference Repository**  
> A practical, opinionated, and well-grounded guide to guide developers and technical leadership in selecting the ideal architecture for each project scope (Small vs. Medium/Large), covering both **Frontend** and **Backend**.

---

## 🎯 Why Does This Repository Exist?

In software engineering, teams often oscillate between two harmful extremes:
1. **Overengineering (Accidental Complexity):** Introducing microservices, 15 layers of abstraction, and dozens of files for a simple project or early MVP. Teams spend more time maintaining architectural boilerplate than shipping real business value.
2. **Underengineering (Spaghetti Code):** Treating critical medium-to-large projects as throwaway scripts, mixing network requests, business rules, and UI rendering in the same place. The system crumbles under concurrency, lacks automated testability, and breaks with every refactor.

This repository establishes **two clear and documented architectural models**, breaking down the **purpose**, **benefits**, and **trade-offs** of each technical decision.

---

## 🧭 Repository Structure Overview

```text
blueprints/
├── small/                                  # TIER 1: MVPs, internal tooling, POCs (1-2 devs)
│   ├── frontend/                           # Single-File Monolith Pattern
│   └── backend/                            # Direct Minimalist Monolith Pattern
│
└── medium-large/                           # TIER 2 & 3: Scalable, long-term corporate projects
    ├── frontend/                           # Clean MVVM with IoC (InversifyJS) & Zod
    │   ├── business/                       # Decoupled business logic (api, application, repository, domain, shared, ioc)
    │   ├── src/                            # Presentation/View layer (pages with base-controller-view-styles quartet, components, etc.)
    │   ├── config/                         # Facades for external libraries (HTTP, Analytics)
    │   └── utils/                          # Schema validation (safeParseWithLogging) and pure utilities
    │
    └── backend/                            # Clean Architecture with Anemic Domain (Total Symmetry with Frontend)
        ├── business/                       # Decoupled core (anemic domain, use-cases, repository, ioc)
        ├── src/                            # HTTP Delivery layer (controllers with Zod, routes, middlewares)
        ├── config/                         # Infrastructure facades (database, logger)
        └── utils/                          # Schema validation (safeParseWithLogging) and id-generator
```

---

## 🟢 1. Small Projects (Tier 1: Small)

### 📌 Context & Scope
- **Target Team:** 1 to 2 developers.
- **Project Nature:** Proofs of Concept (POCs), rapid MVP validation, internal automation, and operational tools.
- **Expected Lifespan:** A few weeks up to 6 months.
- **Traffic Volume:** Under 100 requests per minute.

---

### 🎨 Frontend: Single-File Monolith
📁 Location: [`blueprints/small/frontend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/frontend/README.md)

In this tier, **we deliberately avoid multi-layered separation**. Each page manages its own local state (`useState`, `useEffect`), calls the API directly, and renders its JSX in the exact same file (see [`HomePage.tsx`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/frontend/src/pages/HomePage.tsx)).

#### 🎯 Purpose:
Eliminate accidental complexity. The only goal of an MVP is to validate a business hypothesis with minimum latency and cost.

#### ✅ Benefits:
- **Unbeatable Time-to-Market:** Build a fully working screen in less than an hour.
- **Zero File Fatigue:** Developers open a single file and inspect the entire end-to-end flow in 50 to 80 lines of code.
- **Zero Learning Curve:** Any developer can read, understand, and modify the code instantly.

#### ⚠️ Trade-offs & Limitations (What Does NOT Scale):
- **Hard to Test in Isolation:** Testing screen logic requires rendering the entire component tree using DOM testing tools (Testing Library).
- **Merge Conflicts:** If more than 2 developers touch the same screen simultaneously, Git conflicts are guaranteed.
- **Rule Leakage:** If the product expands to 20 complex business rules, the single file morphs into an unmaintainable 600-line monolith.

---

### ⚙️ Backend: Direct Minimalist Monolith
📁 Location: [`blueprints/small/backend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/backend/README.md)

The API is structured in 1 or 2 straightforward files (see [`src/index.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/backend/src/index.ts)) using Fastify or Express. The route receives payloads, validates basic properties, and persists directly into memory, SQLite, or simple PostgreSQL.

#### 🎯 Purpose:
Deliver the backend with near-zero infrastructure cost and zero boilerplate (no dependency injection containers or intermediary DTO layers).

#### ✅ Benefits:
- **Minimal Operational Cost:** Runs smoothly on a \$5 VPS or free serverless container tiers.
- **Linear Debugging:** No traversing through 5 abstraction directories to find where data is saved.

#### ⚠️ Trade-offs & Limitations (What Does NOT Scale):
- **Framework Coupling:** Business rules reside directly inside `app.post(...)` route handlers.
- **Mocking Database is Difficult:** Unit testing business rules in pure memory without spinning up a real database is unfeasible.

---

## 🟡🔴 2. Medium and Large Projects (Tier 2 & 3: Medium/Large)

### 📌 Context & Scope
- **Target Team:** 3 to 8+ developers (1 to 3 squads).
- **Project Nature:** Commercial SaaS platforms, enterprise B2B portals, high-criticality backends, and long-term products (1 to 3+ years).
- **Traffic Volume:** Hundreds to thousands of requests per minute, requiring high availability, predictability, and maintainability.

---

### 🏛️ Core Principle: Avoid Microservices by Default

> **"Microservices are an organizational solution for massive organizations needing decoupled release pipelines, not a measure of code quality."**

In this repository, we enforce a **Modular Monolith** for the Backend and **Clean MVVM** for the Frontend.
- **Why avoid microservices:** Microservices introduce inter-service network latency, distributed tracing overhead (Jaeger/OpenTelemetry), message broker complexities (RabbitMQ/Kafka), eventual consistency nightmares, and the catastrophic risk of building a *distributed monolith*.
- **The Modular Monolith advantage:** Executes in-process with sub-millisecond call times, benefits from native ACID database transactions, runs on a single cost-effective CI/CD pipeline, and keeps **domain boundaries 100% isolated**.

---

### 🎨 Frontend: Clean MVVM with InversifyJS & Zod
📁 Location: [`blueprints/medium-large/frontend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/README.md)

The Frontend is organized into **4 macro-layers**:

```text
src/
├── business/               # UI-independent business logic
│   ├── api/                # Network gateways & Zod payload validation
│   ├── application/        # Screen use cases (data transformations & orchestration)
│   ├── repository/         # Local persistence (LocalStorage, IndexedDB, BaaS)
│   ├── domain/             # Domain entities (active if using BaaS or local full-stack)
│   ├── shared/             # Design Patterns (Adapters, Mappers, Factories)
│   └── ioc/                # InversifyJS container & injection tokens (Symbol.for)
│
├── src/                    # Presentation / View layer (pure UI)
│   ├── pages/              # Specialized pages following the Quartet pattern
│   ├── components/         # Composite reusable visual components
│   ├── design-system/      # Atomic UI tokens & components (Button, Input)
│   ├── globals/            # Global themes & CSS tokens
│   ├── routes/             # Route definitions & navigation
│   ├── store/              # Low-frequency shared state across screens (session/auth)
│   ├── guards/             # Private route guards (Auth / RBAC)
│   └── hooks/              # Framework connectors linking View to Store
│
├── config/                 # Facade pattern isolating 3rd-party libraries (HTTP, Analytics)
└── utils/                  # Safe schema validation (safeParseWithLogging) & pure helpers
```

---

#### 📐 Strict Contract Separation (`contracts/interfaces` & `contracts/types`)

Every sub-layer within `business/` and `config/` strictly separates contracts from implementations:
1. **`contracts/interfaces/`:** Pure TypeScript interfaces (`IOrderApiGateway`, `IOrderApplicationService`, `IHttpFacade`). Enables classes to depend exclusively on abstractions (DIP - Dependency Inversion Principle).
2. **`contracts/types/`:** Converts **raw network payloads** into **Zod Schemas**, exporting **both** (the raw type and the inferred static type `z.infer<typeof ...>`).
3. **Implementations (`gateway/`, `services/`, `repositories/`, `facades/`):** Concrete classes decorated with InversifyJS `@injectable()`.

**Benefit:** Eliminates runtime type surprises. If an API payload shape drifts, Zod catches it instantly at runtime and TypeScript catches it at compile time.

---

#### 📐 The Page Quartet Pattern (`src/pages/`) vs. Simple Components

For complex pages (see [`src/pages/checkout/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/src/pages/checkout)), we enforce separation across 4 specialized files:

1. **`[name].base.tsx` (Composition Root / Injection Container):**
   - The entry component consumed by routes (`src/routes/`).
   - Resolves concrete dependencies from the Inversify container (`container.get(...)`).
   - Wraps the View, passing `{ states, actions }`.
2. **`[name].controller.tsx` (ViewModel):**
   - Owns all screen state logic (`useState`), effects, and action handlers.
   - Receives services via **parameter injection** (enabling 100% mockability).
   - Returns strictly two objects: `states` (UI-ready presentation data) and `actions` (callbacks and dispatch functions).
3. **`[name].view.tsx` (Pure Presentation / Dumb UI):**
   - Unaware of routing, HTTP clients, or dependency injection containers.
   - Receives only `states` and `actions` via props and renders JSX.
   - **Ideal for Storybook stories and visual regression testing.**
4. **`[name].styles.ts`:**
   - Isolated styling declarations (Tailwind classes, CSS Modules, or style tokens).

> ⚠️ **Golden Rule:**
> The Quartet pattern is **mandatory for Pages**, but **strictly forbidden for Simple Components (`src/components` & `src/design-system`)**. Atomic components (like `Button` or `UserCard`) must remain single files to avoid file fatigue and boilerplate.

---

### ⚙️ Backend: Clean Architecture with Anemic Domain
📁 Location: [`blueprints/medium-large/backend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/backend/README.md)

The Backend mirrors the **exact same architecture as the Frontend**, adapted for server runtime (where there is no View, and `src/` acts as the HTTP Delivery/Presentation layer).

```text
backend/
├── business/
│   ├── domain/             # Anemic entities (OrderEntity: pure data & state)
│   ├── application/        # Use cases housing business rules (CreateOrderUseCase)
│   ├── repository/         # Database interfaces & implementations (OrderPostgresRepository)
│   └── ioc/                # InversifyJS container & injection tokens
│
├── src/                    # HTTP Delivery layer (Zod-validated controllers, routes, middlewares)
├── config/                 # Infrastructure facades (Database, Logger)
└── utils/                  # safeParseWithLogging & ID generator
```

---

#### 🧠 Why Anemic Domain in the Backend?

Many projects attempt classic Domain-Driven Design (DDD) with rich entities (`order.confirm()`, `order.calculateTaxes()`), but face constant impedance mismatch when mapping these classes to modern relational databases and ORMs (Prisma, Drizzle, Kysely).

**Our Pragmatic Stance:**
1. **The Entity (`domain/entities/order.entity.ts`) is ANEMIC:** It is a typed data carrier validated by Zod. It contains zero business logic methods.
2. **The Use Case (`application/use-cases/create-order.use-case.ts`) GOVERNS Rules:** All business validations, state transitions, repository transactions, and notifications live inside Use Cases.

#### ✅ Benefits:
- **Seamless Database/ORM Integration:** The entity maps 1:1 with database tables without complex entity-to-persistence mappers.
- **Blazing Fast Unit Tests:** Use Cases are tested in pure Node by supplying mocks of `IOrderRepository` and `ILoggerFacade`.
- **Cognitive Symmetry:** Developers moving between Frontend and Backend instantly recognize layer conventions and file paths.

---

### 🛡️ The Facade Pattern in `config/` (Frontend & Backend)

Across both Frontend and Backend, third-party NPM libraries are **never imported directly into business logic or UI screens**.
- In Frontend: Native Fetch or Axios is wrapped by [`config/facades/http.facade.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/config/facades/http.facade.ts).
- In Backend: Database drivers are wrapped by [`config/facades/database.facade.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/backend/config/facades/database.facade.ts).

**Purpose & Benefit:** If a third-party package undergoes breaking changes, suffers a vulnerability (CVE), or needs replacement, developers modify **a single facade file** without touching 50 UI pages or 30 backend use cases.

---

### 🔍 Safe Runtime Validation with `safeParseWithLogging` in `utils/`

Located in the outermost utility layer (`utils/schema-validator.ts`), this pure function guarantees data integrity:
1. Executes Zod `safeParse` over incoming requests or API responses.
2. In case of schema violation, logs structured JSON with explicit severities:
   - `warn`: non-blocking discrepancies or partial payloads.
   - `error`: critical contract breaches.
3. Enforces **Fail-Fast**: halts processing immediately with actionable telemetry instead of rendering `undefined` or corrupting database records.

---

## 📊 Consolidated Architecture Comparison

| Architectural Aspect | Tier 1: Small (MVP / Internal) | Tier 2 & 3: Medium/Large (Core Platform) |
| :--- | :--- | :--- |
| **Frontend Pattern** | Single-File Monolith (1 file per screen) | Clean MVVM with IoC (Inversify) & Page Quartet |
| **Backend Pattern** | Direct Minimalist Monolith (1-2 files) | Clean Architecture with Anemic Domain & Use Cases |
| **Inversion of Control (IoC)** | None (direct calls & instantiations) | InversifyJS via Symbol tokens (`Symbol.for`) |
| **Contract Validation** | Simple conditional checks | Zod Schemas via `safeParseWithLogging` & severities |
| **Testing Strategy** | End-to-end (E2E) or integration | Pure unit testing in Node (zero DOM/database requirement) |
| **Initial Velocity** | ⚡ Maximum (deliver in hours/days) | ⏱️ Moderate (requires contracts, types & binds) |
| **Long-Term Maintenance Cost** | ⚠️ High if the project grows | 💎 Low (safe refactoring, zero squad merge collisions) |

---

## 📋 Cross-Cutting Guidelines ([`guidelines/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines))

Regardless of the selected Tier, all projects must adhere to baseline corporate guidelines:
1. [`api-standards.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/api-standards.md): RFC 7807 Problem Details error envelopes, mandatory pagination, and mutation idempotency.
2. [`security-baseline.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/security-baseline.md): Fail-fast environment variable parsing via Zod and least-privilege principles.
3. [`observability.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/observability.md): Structured JSON logging with trace IDs, correlation contexts, and standard `/health/live` & `/health/ready` endpoints.
4. [`contracts.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/contracts.md): Type-safe Frontend-Backend contract synchronization via OpenAPI.
