# 🏛️ Architecture Decision Catalog & Blueprints

Repositório local de referência com propostas de arquiteturas e padrões para a empresa, divididas por porte de projeto (Pequenos vs. Médios/Grandes), abrangendo Frontend e Backend com foco em evitar microsserviços desnecessários.

---

## 🧭 Organização dos Blueprints

```text
blueprints/
├── small/                         # Tier 1: MVPs, ferramentas pontuais, POCs (1-2 devs)
│   ├── frontend/                  # SPA direto (Monólito Single-File)
│   └── backend/                   # Monólito minimalista (rotas e persistência direta em 1 arquivo)
│
└── medium-large/                  # Tier 2 & 3: Projetos corporativos contínuos
    ├── frontend/                  # Clean MVVM com separação estrita:
    │   ├── business/              # api (gateway), application, repository, domain, shared, ioc (Inversify)
    │   ├── src/                   # view: pages (quarteto base-controller-view-styles), components, design-system
    │   ├── config/                # facades (http, analytics) isoladas com interfaces
    │   └── utils/                 # schema-validator (safeParseWithLogging), calculations
    │
    └── backend/                   # Clean Architecture com Domínio Anêmico (Simetria Total com o Front):
        ├── business/              # domain (entidades anêmicas), application (use-cases), repository, ioc (Inversify)
        ├── src/                   # apresentação HTTP: controllers (Zod safeParse), routes, middlewares
        ├── config/                # facades (database, logger) com interfaces
        └── utils/                 # schema-validator (safeParseWithLogging), id-generator
```

---

## 📊 O Que Escala vs. O Que Não Escala

| Porte do Projeto | Frontend Recomendado | Backend Recomendado | O que Escala ✅ | O que NÃO Escala ❌ |
| :--- | :--- | :--- | :--- | :--- |
| **Pequeno (Small)** | SPA Direto / Vite | Monólito Minimalista | Velocidade máxima de entrega, custo de infra quase zero. | Equipes com mais de 3 devs, regras complexas no controller. |
| **Médio/Grande** | Clean MVVM Adaptado | **Monólito Modular** | Telas e libs externas trocadas sem quebrar regras; testes rápidos; deploy atômico e transações ACID. | Forçar microsserviços antes da hora (gera o inferno do monólito distribuído). |

---

## 🤖 Camada Spec-Driven / IA (`.specs/`)
- [`SPEC_DRIVEN_FLOW.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/SPEC_DRIVEN_FLOW.md): Guia operacional passo a passo do fluxo orientado a IA.
- [`.specs/templates/project-brief.spec.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/templates/project-brief.spec.md): Formulário de entrada de requisitos.
- [`.specs/templates/architectural-decision.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/templates/architectural-decision.md): Template de ADR.
- [`.specs/prompts/architecture-advisor.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/prompts/architecture-advisor.md): Prompt para o agente avaliar e recomendar o padrão correto.
