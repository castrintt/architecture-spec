# 📊 Architectural Decision Matrix

This matrix aims to eliminate subjective, dogmatic debates when selecting an architecture. The golden rule is: **minimum functional effort with the lowest long-term maintenance cost wins**.

> **"Any architecture you do not need is accidental complexity that steals time from your team."**

---

## 1. Project Evaluation Scorecard

Assign scores (1 to 3 points) across each dimension and calculate the total:

| Dimension | 1 Point (Low) | 2 Points (Medium) | 3 Points (High) | Project Score |
| :--- | :--- | :--- | :--- | :--- |
| **1. Dedicated Team Size** | 1 to 2 developers | 3 to 7 developers (1 squad) | 8+ developers (multiple squads) | `[ ]` |
| **2. Concurrency / Peak Traffic** | < 100 req/min (Internal tool, MVP) | 100 to 5,000 req/min | > 5,000 req/min or volatile spikes | `[ ]` |
| **3. Domain Complexity** | Direct CRUD, few business rules | 2 to 5 bounded domains, async workflows | 6+ domains, financial/audit requirements | `[ ]` |
| **4. Downtime Tolerance (SLA)** | Tolerant (scheduled maintenance acceptable) | 99.5% uptime (downtime causes operational friction) | 99.99% uptime (downtime causes immediate financial loss) | `[ ]` |
| **5. Expected Lifespan** | Proof of concept, script, lifespan < 6 months | Ongoing business product or SaaS (1 to 3 years) | Long-term enterprise platform (3+ years) | `[ ]` |

### Total Score:
- **5 to 8 Points:** 🟢 **Tier 1 (Small)**
- **9 to 15 Points:** 🟡🔴 **Tier 2 & 3 (Medium/Large)**

---

## 2. In-Depth Tier Breakdown

### 🟢 Tier 1: Small (MVP, Internal Tool, POC)
- **Frontend:** **Single-File Monolith** (React + Vite). Screen state, effects, and JSX rendering live inside the same file per screen/component. Zero abstraction overhead.
- **Backend:** Direct Minimalist Monolith (Fastify or Express) connected directly to persistence (SQLite or simple PostgreSQL).
- **What Scales:**
  - Initial delivery velocity (unbeatable time-to-market).
  - Infrastructure cost (runs on a \$5 VPS or free serverless container).
  - Ease of debugging (local linear stack traces).
- **What Does NOT Scale:**
  - Maintenance when team size exceeds 2 developers editing shared files.
  - Complex domain rules that begin leaking into HTTP routes and presentation components.
  - Automated unit testing without rendering full DOM or running database servers.

---

### 🟡🔴 Tier 2 & 3: Medium/Large (Commercial SaaS, Core Platform, 1+ Squads)
- **Frontend:** **Clean MVVM with Strict Page Segregation**:
  - **In Pages (`src/pages/`):** Mandatory Quartet pattern (`.base.tsx` [Composition Root], `.controller.tsx` [ViewModel], `.view.tsx` [Dumb UI], `.styles.ts` [Isolated styles]).
  - **In Components (`src/components/`, `src/design-system/`):** Direct 1-file components (Quartet strictly forbidden to avoid file fatigue).
- **Backend:** **Clean Architecture with Anemic Domain** (Total cognitive symmetry with Frontend, avoiding microservices by default).
- **Persistence & Communications:** Centralized relational database (PostgreSQL), OpenAPI contracts, in-memory domain events.
- **What Scales:**
  - Multiple engineers working simultaneously without Git merge conflicts.
  - Testability (use cases and controllers tested in pure Node with 100% mockable interfaces).
  - Safe refactoring and long-term evolvability.
- **What Does NOT Scale:**
  - Attempting to use this for throwaway 1-week prototypes (produces unnecessary initial friction).
