# 🧭 Guia do Fluxo Orientado a IA (Spec-Driven Development)

Este documento define o processo padrão para utilizar Inteligência Artificial na tomada de decisão e na inicialização de projetos na empresa, garantindo que o código gerado siga os padrões arquiteturais sem alucinações.

---

## 🎯 Por que Spec-Driven?

Pedir código para LLMs sem uma especificação estruturada resulta em:
- Arquiteturas inconsistentes entre diferentes desenvolvedores.
- Complexidade desnecessária (LLMs adoram sugerir microsserviços e bibliotecas pesadas por padrão).
- Falta de documentação sobre *por que* certas decisões foram tomadas.

Com o fluxo **Spec-Driven**, a IA é forçada a seguir a **Matriz de Decisão** e os **Blueprints Oficiais** da empresa.

---

## 📋 Passo a Passo do Fluxo

### Passo 1: Preencher o Briefing do Projeto
O desenvolvedor ou Product Owner copia o arquivo de template:
`cp .specs/templates/project-brief.spec.md meu-projeto.spec.md`

E responde apenas às questões de negócio e limites operacionais:
1. **Tamanho do time dedicado:** (1-2 devs, 3-7 devs, 8+ devs)
2. **Volume esperado no pico:** (< 100 req/min, 100-5.000 req/min, > 5.000 req/min)
3. **Complexidade do domínio:** (CRUD simples, regras com fluxos assíncronos, domínio financeiro crítico)
4. **SLA e tolerância a downtime:** (baixa, média, alta)
5. **Vida útil prevista:** (< 6 meses, 1 a 3 anos, plataforma contínua)

---

### Passo 2: Submeter ao Agente de IA (Prompt de Consultoria)
No seu ambiente de IA (Cursor Composer, Claude ou Copilot), forneça o contexto:
1. `@DECISION_MATRIX.md`
2. `@.specs/prompts/architecture-advisor.md`
3. `@meu-projeto.spec.md`

E execute a instrução:
> *"Com base no meu briefing e na matriz de decisão corporativa, avalie a pontuação, determine o Tier adequado (Small ou Medium-Large) e gere o ADR formal correspondente."*

---

### Passo 3: Revisão Humana e Geração do ADR
A IA responderá com:
1. A pontuação calculada no scorecard (ex: 10 de 15 pontos -> **Medium-Large**).
2. A justificativa técnica e os trade-offs do que escala e não escala.
3. O rascunho completo do **ADR (Architectural Decision Record)**.

O Tech Lead revisa, ajusta se necessário e salva o arquivo como `ADR-001-arquitetura-base.md` na raiz do novo projeto.

---

### Passo 4: Mapeamento do Blueprint
Com o Tier aprovado no ADR:
- Se **Small**: Utilizar como ponto de partida as pastas [`blueprints/small/frontend`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/frontend) e [`blueprints/small/backend`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/backend).
- Se **Medium-Large**: Utilizar como ponto de partida a arquitetura Clean MVVM em [`blueprints/medium-large/frontend`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend) e o Monólito Modular em [`blueprints/medium-large/backend`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/backend).

A partir deste ponto, a IA pode ser instruída a gerar novos módulos mantendo rigorosamente a convenção do blueprint adotado.

