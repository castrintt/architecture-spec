# 📜 ADR 000: [Título Curto da Decisão]

- **Status:** `[Proposto | Aceito | Depreciado | Substituído por ADR-XXX]`
- **Data:** `[YYYY-MM-DD]`
- **Autores:** `[Nome dos envolvidos]`
- **Tier Recomendado:** `[Tier 1: Small | Tier 2: Medium | Tier 3: Large]`

---

## 1. Contexto e Declaração do Problema
Descreva a motivação de negócio, restrições orçamentárias, tamanho do time e requisitos técnicos levantados no `project-brief.spec.md`.

---

## 2. Decisão Arquitetural
Qual padrão foi escolhido para Frontend e Backend? Aponte a pasta de blueprint correspondente como referência base.

- **Frontend:** `[Ex: Feature-Sliced Design em React + TanStack Query baseado em blueprints/medium/frontend-modular]`
- **Backend:** `[Ex: Monólito Modular Hexagonal baseado em blueprints/medium/backend-modular-monolith]`
- **Persistência & Dados:** `[Ex: PostgreSQL com schemas separados por módulo]`

---

## 3. Justificativa & Trade-offs (O que ganhamos vs. O que pagamos)

### ✅ Vantagens (Por que essa decisão foi a vencedora)
- ...
- ...

### ⚠️ Consequências Negativas e Limitações Aceitas (O que NÃO escala aqui)
- ...
- ...

---

## 4. Estratégia de Evolução Futura (Gatilhos de Migração)
Defina métricas objetivas que forçarão a reavaliação desta decisão no futuro:
- *Exemplo:* "Se o time crescer para mais de 8 desenvolvedores ou o módulo de pagamentos ultrapassar 2.000 transações/min com picos, extrairemos esse módulo específico para um serviço independente via outbox pattern."

