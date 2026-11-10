# 🟡🔴 Blueprint: Frontend for Medium & Large Projects (Clean MVVM Adapted)

Engineered for enterprise scalability, avoiding microservices and enabling multiple engineers to work in parallel without coupling or overengineering.

---

## 🏗️ The 4 Macro-Layers Breakdown

### 1. `business/` (UI-Independent Business Intelligence)

All business sub-layers (except `ioc/` and `src/`) enforce strict separation between contracts and implementations:
- `contracts/`:
  - `interfaces/`: Pure TypeScript interface contracts (`IOrderApiGateway`, `IOrderApplicationService`, `ILocalCacheRepository`, `IOrderEntity`).
  - `types/`: Conversion and runtime validation via Zod starting from raw network types, exporting **both** (raw network type and inferred Zod type `z.infer<typeof ...>`).
- Implementations:
  - `api/gateway/`: Gateway classes (`OrderApiGateway`) implementing interfaces and consuming Zod with `safeParseWithLogging`.
  - `application/services/`: Screen orchestration services (`OrderApplicationService`).
  - `repository/repositories/`: Local persistence adapters (`LocalStorageRepository`).
  - `domain/entities/`: Domain entities (`OrderEntity`).
  - `shared/adapters/`: Design patterns (`OrderDtoToEntityAdapter`).
- `ioc/`: Inversion of Control with **InversifyJS**. Defines tokens (`TYPES` via `Symbol.for`) and binds interfaces to concrete singletons.

### 2. `config/` (Facades for External Libraries)
- `contracts/interfaces/`: Framework-agnostic contracts (`IHttpFacade`, `IAnalyticsFacade`).
- `contracts/types/`: Types and response schemas (`HttpResponse<T>`, `AnalyticsProperties`).
- `facades/`: Isolated implementations (`NativeHttpFacade`, `ConsoleAnalyticsFacade`). No screen or service imports Axios, Fetch, or Sentry directly.

### 3. `src/` (Presentation / View Layer)

#### 📐 Mandatory Pattern for Pages (`src/pages/`):
Every page strictly follows the 4-file specialist segregation (demonstrated in [`src/pages/checkout/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/src/pages/checkout)):
- `[name].base.tsx`: **Composition Root / Container**. Injects concrete `business` services into the controller and wraps the View passing `{ states, actions }`. Consumed by routes.
- `[name].controller.tsx`: **ViewModel**. Houses screen logic and hooks, receiving dependencies via parameter injection. Returns strictly two objects: `states` and `actions`.
- `[name].view.tsx`: **Dumb UI**. Unaware of services or routing; receives only `states` and `actions` via props. Perfect for Storybook and visual regression testing.
- `[name].styles.ts`: Isolated screen styling.

> ⚠️ **Corporate Golden Rule:** The Quartet pattern is **mandatory for Pages**, but **strictly forbidden for Simple Reusable Components** (`src/components` and `src/design-system`), where direct 1-file components prevent file fatigue.

- `components/`: Composite UI components.
- `design-system/`: Atomic tokens and base components (Buttons, Inputs, Modals).
- `globals/`: Themes, global CSS variables, visual constants.
- `routes/`: Centralized route tables.
- `store/`: Low-frequency shared state across screens (auth/session).
- `guards/`: Route authorization guards (RBAC).
- `hooks/`: Framework connectors bridging View and Store.

### 4. `utils/` (Pure Global Utilities)
- `schema-validator.ts`: Pure helper `safeParseWithLogging` for Zod schema validation with structured severity logging (`warn`/`error`).
- `calculations.ts`: Pure helpers for currency, formatting, and numeric operations.

---

## ⚖️ What Scales vs. What Does NOT Scale
- **What Scales:**
  - Views can be completely redesigned or swapped without touching a single line of business logic.
  - Blazing-fast unit tests running in pure Node without mounting DOM.
  - Squad growth without Git merge collisions.
- **What Does NOT Scale:**
  - Applying this full structure to a 1-developer 2-screen prototype (Tier 1: Small) creates unnecessary initial overhead.
