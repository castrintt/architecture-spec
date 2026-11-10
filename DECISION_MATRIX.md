# 📊 Matriz de Decisão Arquitetural (Decision Matrix)

Esta matriz tem o objetivo de eliminar discussões puramente dogmáticas e subjetivas na escolha da arquitetura. A regra de ouro é: **o menor esforço funcional com o menor custo de manutenção vence**.

> **"Qualquer arquitetura que você não precisa é complexidade acidental que roubará tempo da sua equipe."**

---

## 1. Scorecard de Avaliação de Projetos

Atribua a pontuação de cada dimensão (1 a 3 pontos) e some o total:

| Dimensão | 1 Ponto (Baixo) | 2 Pontos (Médio) | 3 Pontos (Alto) | Pontos do Projeto |
| :--- | :--- | :--- | :--- | :--- |
| **1. Tamanho da Equipe** | 1 a 2 desenvolvedores | 3 a 7 desenvolvedores (1 squad) | 8+ desenvolvedores (múltiplas squads) | `[ ]` |
| **2. Concorrência / Volume** | < 100 req/min (Ferramenta interna, MVP) | 100 a 5.000 req/min | > 5.000 req/min ou picos imprevisíveis | `[ ]` |
| **3. Complexidade de Domínio** | CRUD direto, poucas regras de negócio | 2 a 5 domínios integrados, fluxos assíncronos | 6+ bounded contexts, fluxos financeiros/auditoria crítica | `[ ]` |
| **4. Tolerância a Quedas (SLA)** | RPO/RTO tolerante (horas de manutenção aceitáveis) | 99.5% uptime (quedas impactam negócio em horário comercial) | 99.99% uptime (quedas causam prejuízo financeiro imediato) | `[ ]` |
| **5. Ciclo de Vida do Software** | Prova de conceito, script, vida útil < 6 meses | Produto interno contínuo ou SaaS com roadmap ativo | Plataforma corporativa crítica de longo prazo | `[ ]` |

### Total de Pontos:
- **5 a 8 Pontos:** 🟢 **Tier 1 (Small)**
- **9 a 12 Pontos:** 🟡 **Tier 2 (Medium)**
- **13 a 15 Pontos:** 🔴 **Tier 3 (Large)**

---

## 2. Análise Detalhada dos Tiers

### 🟢 Tier 1: Small (MVP, Ferramenta Interna, POC)
- **Frontend:** **Monólito Single-File** (React + Vite). A lógica (hooks/fetch) e a renderização (JSX) residem no mesmo arquivo por tela/componente. Zero cerimônia de injeção ou separação de controller/view.
- **Backend:** Monólito Minimalista (Fastify / Express / Go standard / Nest minimalista) conectado diretamente ao banco (PostgreSQL ou SQLite para POCs locais).
- **Banco de Dados:** Banco relacional único ou serviço gerenciado (Supabase/Firebase se time for 1 dev).
- **O que escala:**
  - Velocidade inicial de entrega (time-to-market imbatível).
  - Custo de infraestrutura (roda em 1 container simples ou VM de $5).
  - Facilidade de depuração (stack trace local direto).
- **O que NÃO escala:**
  - Manutenção com time acima de 3 devs editando as mesmas pastas.
  - Regras de negócio complexas que começam a vazar na camada de apresentação/rotas.
  - Testabilidade se a lógica ficar acoplada diretamente ao framework HTTP.

---

### 🟡 Tier 2: Medium (SaaS Comercial, Produto Modular, 1 a 3 Squads)
- **Frontend:** **Clean MVVM com Segregação Especialista de Páginas**:
  - **Em Páginas (`src/pages/`):** Padrão Quádruplo obrigatório (`.base.tsx` [Injeção/Composition Root], `.controller.tsx` [ViewModel - States & Actions], `.view.tsx` [UI Burra], `.styles.ts` [Estilos isolados]).
  - **Em Componentes (`src/components/`, `src/design-system/`):** Componentes visuais diretos em 1 ou 2 arquivos (proibido usar quarteto para evitar *file fatigue*).
- **Backend:** **Monólito Modular** com Clean/Hexagonal Architecture (Ports and Adapters).
- **Banco de Dados:** Relacional centralizado (PostgreSQL), schemas separados por módulo se necessário.
- **Comunicação:** REST bem documentado (OpenAPI) e eventos em memória (EventEmitter ou outbox leve).
- **O que escala:**
  - Facilidade para múltiplas pessoas trabalharem sem conflitos de merge (pastas isoladas por módulo).
  - Testabilidade (regras de negócio 100% isoladas de banco e HTTP; controllers de tela testados em Node puro).
  - Preparado para evolução: se um módulo virar um gargalo real de CPU/escala, pode ser extraído para microsserviço sem reescrever o domínio.
- **O que NÃO escala:**
  - Não faz deploy independente de partes do sistema (deploy é atômico).
  - Não atende múltiplos times corporativos com pipelines totalmente dissociados.

---

### 🔴 Tier 3: Large (Enterprise, Múltiplas Squads, Alta Escala)
- **Frontend:** Monorepo Estruturado (Turborepo ou Nx) com Design System compartilhado, Apps desacoplados e Federação de Módulos (se estritamente necessário).
- **Backend:** Microsserviços orientados a Domínio (DDD) + Arquitetura Orientada a Eventos (Kafka, RabbitMQ, SQS).
- **Banco de Dados:** Database per Service, CQRS onde há disparidade brutal entre leitura e escrita.
- **Observabilidade:** OpenTelemetry obrigatório (Tracing distribuído, logs estruturados em JSON, métricas Prometheus).
- **O que escala:**
  - Autonomia real de deploys: Squad A não derruba nem bloqueia Squad B.
  - Escala elástica seletiva: scale-out apenas do nó de checkout ou processamento de pagamentos.
- **O que NÃO escala:**
  - **Custo operacional e cognitivo:** depurar um bug exige rastreio distribuído.
  - **Consistência:** exige tratamento rigoroso de consistência eventual, idempotência e Saga pattern.
  - **Inviável para times pequenos:** se aplicado em equipes de menos de 8 devs, a equipe passará mais tempo mantendo infraestrutura e pipelines do que entregando valor de negócio.

