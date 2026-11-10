# 🟢 Blueprint: Small (Frontend - Single-File Monolith)

Tailored for small projects (MVPs, internal tools, proofs of concept, 1 to 2 developers).

---

## 🎯 Philosophy: Single-File Component Monolith

In small projects, **we do not split components across Base, Controller, and View files**. A single file manages its local state, executes API calls, and renders JSX.

```text
src/
├── api/
│   └── client.ts         # Direct fetch/axios HTTP client
├── components/
│   └── ItemCard.tsx      # Direct component (styles + logic + JSX together)
└── pages/
    └── HomePage.tsx      # Monolithic page (state + fetch + rendering)
```

---

## ⚖️ What Scales vs. What Does NOT Scale

- **What Scales:**
  - **Pure delivery speed:** build an entire page in a single file without ceremony.
  - **Zero bureaucracy:** no dependency injection boilerplate, no duplicated types.
  - **Effortless comprehension for 1 dev:** the entire screen flow is readable top-to-bottom in 50 lines.

- **What Does NOT Scale:**
  - As business rules multiply, the file grows into a hard-to-maintain 300+ line monolith.
  - Testing business logic in isolation requires rendering the full DOM with Testing Library.
  - Multiple developers editing the same file experience frequent Git merge conflicts.
