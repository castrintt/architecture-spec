# 🎭 Demonstração Prática: O Fluxo em Ação (Walkthrough)

> Use este roteiro durante a apresentação para o time ou comitê técnico para ilustrar como o fluxo Spec-Driven funciona na prática, do briefing à decisão arquitetural.

---

## 🎬 Cenário da Demonstração
**Novo Projeto:** *"Portal de Homologação e Pagamentos de Fornecedores"*  
**Contexto:** Um time de 4 engenheiros precisa construir um sistema web onde fornecedores sobem faturas fiscais, o sistema valida os dados e consulta status no ERP financeiro.

---

### Passo 1: O Desenvolvedor Preenche a Especificação
O desenvolvedor abre o arquivo [`.specs/templates/project-brief.spec.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/templates/project-brief.spec.md) e responde apenas a fatos operacionais:

```markdown
- Nome: portal-fornecedores
- Time dedicado: [x] 3-7 devs (4 devs)
- Pico de requisições: [x] 100 - 5.000 req/min (~600 req/min)
- Criticidade/SLA: [x] Média criticidade (99.5% uptime)
- Ciclo de vida: [x] Produto contínuo (1 a 3 anos)
- Entidades: Fornecedor, Fatura, Pagamento, Aprovador
```

---

### Passo 2: O Desenvolvedor Consulta o Agente de IA
No Cursor, Claude ou Copilot, o dev fornece o briefing preenchido e invoca o [`.specs/prompts/architecture-advisor.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/prompts/architecture-advisor.md):

> *"Com base no meu brief e na DECISION_MATRIX.md, avalie a pontuação e recomende a arquitetura."*

---

### Passo 3: Resposta da IA (Diagnóstico & Anti-Overengineering)

A IA processa as regras corporativas e emite o parecer:

```text
📊 Avaliação do Scorecard:
- Tamanho da Equipe: 2 pontos (3 a 7 devs)
- Concorrência/Pico: 2 pontos (100 a 5.000 req/min)
- Complexidade de Domínio: 2 pontos (4 entidades integradas)
- Tolerância a Falhas: 2 pontos (99.5% SLA)
- Ciclo de Vida: 2 pontos (Produto contínuo)
Total: 10 de 15 pontos -> 🟡 Tier: Medium-Large

⚠️ Alerta contra Overengineering:
Embora o time envolva pagamentos e ERP externo, o volume previsto (600 req/min) 
e a equipe de 4 pessoas NÃO justificam microsserviços. 
Adotar microsserviços agora geraria complexidade desnecessária com mensageria, 
rastreio distribuído e inconsistência de dados.

✅ Recomendação Oficial:
- Backend: Monólito Modular (Clean Architecture / Bounded Contexts)
  Referência: blueprints/medium-large/backend/
- Frontend: Clean MVVM Adaptado (4 Camadas: business, src, config, utils)
  Referência: blueprints/medium-large/frontend/
```

---

### Passo 4: O ADR Formal é Gerado
A IA preenche automaticamente o template [`.specs/templates/architectural-decision.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/.specs/templates/architectural-decision.md) e o salva na raiz do projeto:

```markdown
# 📜 ADR 001: Adoção de Monólito Modular e Frontend Clean MVVM
- Status: Aceito
- Data: 2026-11-09
- Decisão: Aprovado o uso do Tier Medium-Large. Microsserviços expressamente evitados.
- Gatilho de Revisão Futura: Caso o time se divida em 3 squads distintas ou o módulo
  de conciliação fiscal ultrapasse 3.000 req/min com pico isolado, avaliar extração
  deste módulo específico via mensageria assíncrona.
```

---

### Passo 5: O Desenvolvedor Inicia o Projeto
Com a decisão registrada e aprovada, o time copia a estrutura do blueprint oficial:
- No **Frontend**, a equipe sabe exatamente onde cada arquivo deve ficar:
  - O gateway com o ERP fica em `business/api/gateway.ts`.
  - A formatação de moeda da fatura fica em `business/application/order.service.ts`.
  - Os botões visuais ficam em `src/design-system/Button.tsx`.
  - A lib externa de HTTP fica encapsulada em `config/http.facade.ts`.
- No **Backend**, a lógica de negócio fica em `business/domain/order.entity.ts`, totalmente desacoplada de Fastify/Express e do banco de dados.

---

## 🎯 Por que essa abordagem convence lideranças técnicas?
1. **Elimina a "Opinião do Dev":** A escolha é baseada em métricas objetivas (Scorecard).
2. **Economiza Custo de Nuvem:** Evita criar 10 microsserviços que poderiam rodar em um único container de Monólito Modular com desempenho superior.
3. **Auditabilidade:** Todo projeto já nasce com o seu ADR documentando o porquê de cada decisão técnica.

