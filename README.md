# 🏛️ Architecture Decision Catalog & Blueprints

> **Repositório de Referência Arquitetural Corporativa**  
> Um guia prático, opinativo e fundamentado para orientar desenvolvedores e lideranças técnicas na escolha da arquitetura ideal para cada porte de projeto (Pequenos vs. Médios/Grandes), abrangendo **Frontend** e **Backend**.

---

## 🎯 Por que este repositório existe?

No desenvolvimento de software, existem dois extremos prejudiciais:
1. **Overengineering (Complexidade Acidental):** Aplicar microsserviços, 15 camadas de abstração e dezenas de arquivos em um projeto simples ou MVP. O time gasta mais tempo gerenciando "cola" de arquitetura do que entregando valor.
2. **Underengineering (Código Espaguete):** Tratar projetos críticos de médio e grande porte como scripts rápidos, misturando chamadas de rede, regras de negócio e renderização no mesmo lugar. O sistema não aguenta concorrência, não é testável e quebra a cada refatoração.

Este repositório estabelece **dois modelos claros e documentados**, explicando o **propósito**, os **ganhos** e os **trade-offs** de cada escolha técnica.

---

## 🧭 Mapa Geral da Estrutura

```text
blueprints/
├── small/                                  # TIER 1: MVPs, ferramentas internas, POCs (1-2 devs)
│   ├── frontend/                           # Padrão Monólito Single-File
│   └── backend/                            # Padrão Monólito Minimalista Direto
│
└── medium-large/                           # TIER 2 & 3: Projetos corporativos contínuos e escaláveis
    ├── frontend/                           # Clean MVVM com IoC (Inversify) e Zod
    │   ├── business/                       # Inteligência desacoplada da UI (api, application, repository, domain, shared, ioc)
    │   ├── src/                            # Camada de View (pages com quarteto base-controller-view-styles, components, etc.)
    │   ├── config/                         # Fachadas (Facades) para libs externas (HTTP, Analytics)
    │   └── utils/                          # Validação segura (safeParseWithLogging) e helpers puros
    │
    └── backend/                            # Clean Architecture com Domínio Anêmico (Simetria Total com o Front)
        ├── business/                       # Núcleo desacoplado de HTTP (domain anêmico, use-cases, repository, ioc)
        ├── src/                            # Entrega HTTP (controllers com Zod, routes, middlewares)
        ├── config/                         # Fachadas para infraestrutura (database, logger)
        └── utils/                          # Validação segura (safeParseWithLogging) e id-generator
```

---

## 🟢 1. Projetos Pequenos (Tier 1: Small)

### 📌 Contexto
- **Público-alvo:** 1 a 2 desenvolvedores.
- **Natureza do projeto:** Provas de conceito (POCs), MVPs de validação rápida, ferramentas internas operacionais e automações.
- **Vida útil prevista:** De poucas semanas a 6 meses.
- **Volume:** Menos de 100 requisições por minuto.

---

### 🎨 Frontend: Monólito Single-File
📁 Localização: [`blueprints/small/frontend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/frontend/README.md)

Neste modelo, **não utilizamos separação em múltiplas camadas**. Cada página gerencia seu estado (`useState`, `useEffect`), consome a API diretamente e renderiza o JSX no mesmo arquivo (veja [`HomePage.tsx`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/frontend/src/pages/HomePage.tsx)).

#### 🎯 Propósito:
Eliminar toda e qualquer burocracia desnecessária. O objetivo de um MVP é validar uma hipótese de negócio no menor tempo e com o menor custo possível.

#### ✅ Ganhos:
- **Time-to-Market imbatível:** Cria-se uma tela inteira e funcional em menos de 1 hora.
- **Zero fadiga de arquivos (*file fatigue*):** O desenvolvedor abre um único arquivo e enxerga todo o fluxo de ponta a ponta em 50 a 80 linhas.
- **Curva de aprendizado nula:** Qualquer desenvolvedor, do estagiário ao sênior, consegue manter o código imediatamente.

#### ⚠️ Trade-offs & Limitações (O que NÃO escala):
- **Testes isolados difíceis:** Para testar a lógica da tela, é obrigatório renderizar o componente inteiro no Testing Library.
- **Conflitos de merge:** Se mais de 2 pessoas mexerem na mesma tela simultaneamente, haverá atrito constante no Git.
- **Vazamento de regras:** Se o produto crescer e ganhar 20 novas regras, a página vira um arquivo monstro de 600 linhas.

---

### ⚙️ Backend: Monólito Minimalista Direto
📁 Localização: [`blueprints/small/backend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/backend/README.md)

O servidor é construído em 1 ou 2 arquivos diretos (veja [`src/index.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/small/backend/src/index.ts)) usando Fastify ou Express. A rota recebe o payload, valida campos básicos e persiste direto em memória, SQLite ou Postgres simples.

#### 🎯 Propósito:
Entregar a API com custo de infraestrutura quase zero e sem burocracia de injeção de dependência ou DTOs intermediários.

#### ✅ Ganhos:
- **Custo operacional mínimo:** Roda perfeitamente em uma VM simples de $5 ou em containers serverless gratuitos.
- **Manutenção linear:** Sem navegar por 5 diretórios para achar onde o dado é salvo no banco.

#### ⚠️ Trade-offs & Limitações (O que NÃO escala):
- **Acoplamento ao framework HTTP:** A regra de negócio fica presa dentro do callback da rota `app.post(...)`.
- **Dificuldade de mockar o banco:** Impossível rodar testes unitários rápidos sem subir o banco de dados.

---

## 🟡🔴 2. Projetos Médios e Grandes (Tier 2 & 3: Medium/Large)

### 📌 Contexto
- **Público-alvo:** 3 a 8+ desenvolvedores (1 a 3 squads).
- **Natureza do projeto:** Produtos SaaS comerciais, portais B2B corporativos, backends de alta criticidade e aplicações com roadmap contínuo (1 a 3+ anos).
- **Volume:** Centenas a milhares de requisições por minuto com exigência de estabilidade e manutenibilidade.

---

### 🏛️ Diretriz Central: Evitar Microsserviços por Padrão

> **"Microsserviço é uma solução organizacional para times gigantes que precisam fazer deploys independentes, não um requisito de qualidade de código."**

Neste repositório, adotamos o **Monólito Modular** no Backend e o **Clean MVVM** no Frontend.
- **Por que evitar microsserviços:** Microsserviços introduzem latência de rede entre chamadas, custos de observabilidade distribuída (Jaeger/OpenTelemetry), necessidade de mensageria assíncrona (RabbitMQ/Kafka), consistência eventual e o risco iminente de criar um *monólito distribuído*.
- **O ganho do Monólito Modular:** Executa em memória com latência próxima de zero, utiliza transações ACID nativas do banco de dados, possui pipeline de CI/CD único e muito mais barato, mantendo as **fronteiras de domínio 100% isoladas**.

---

### 🎨 Frontend: Clean MVVM Adaptado com InversifyJS e Zod
📁 Localização: [`blueprints/medium-large/frontend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/README.md)

O Frontend é estruturado em **4 macro-camadas**:

```text
src/
├── business/               # Inteligência e regras desacopladas da UI
│   ├── api/                # Gateway de rede HTTP e validação Zod
│   ├── application/        # Casos de uso de tela (trata e transporta dados)
│   ├── repository/         # Persistência em Storage local, IndexedDB ou BaaS
│   ├── domain/             # Entidades de negócio (ativo se usar BaaS/Next local)
│   ├── shared/             # Design Patterns (Adapters, Mappers, Factories)
│   └── ioc/                # InversifyJS Container e Tokens (Symbol.for)
│
├── src/                    # Camada de View / Apresentação (UI pura)
│   ├── pages/              # Páginas especialistas no padrão Quádruplo
│   ├── components/         # Componentes visuais compostos
│   ├── design-system/      # Tokens e componentes atômicos (Button, Input)
│   ├── globals/            # Temas CSS e estilos globais
│   ├── routes/             # Definição e navegação de rotas
│   ├── store/              # Estado compartilhado entre telas de baixa frequência
│   ├── guards/             # Proteção de rotas privadas (Auth/RBAC)
│   └── hooks/              # Conectores agnósticos da View com a Store
│
├── config/                 # Padrão Facade isolando bibliotecas externas (HTTP, Analytics)
└── utils/                  # Função pura safeParseWithLogging e helpers
```

---

#### 📐 A Separação de Contratos em Cada Camada (`contracts/interfaces` e `contracts/types`)

Em todas as subcamadas de `business/` e `config/`, separamos rigorosamente contratos de implementações:
1. **`contracts/interfaces/`:** Contratos puros de interface TypeScript (`IOrderApiGateway`, `IOrderApplicationService`, `IHttpFacade`). Permite que as classes dependam apenas de abstrações (DIP - Dependency Inversion Principle).
2. **`contracts/types/`:** Conversão do **tipo cru nativo de rede** para o **Schema Zod**, exportando **ambos** (o tipo cru e o tipo inferido `z.infer<typeof ...>`).
3. **Implementações (`gateway/`, `services/`, `repositories/`, `facades/`):** Classes concretas decoradas com `@injectable()` do InversifyJS.

**Ganhos:** Elimina qualquer tipo de "adivinhação" de tipagem. Se a resposta da API mudar, o Zod falha em tempo de execução e o TypeScript avisa em tempo de compilação.

---

#### 📐 Padrão Quádruplo em Páginas (`src/pages/`) vs. Componentes Comuns

Para páginas complexas (veja [`src/pages/checkout/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/src/pages/checkout)), aplicamos a segregação em 4 arquivos especialistas:

1. **`[nome].base.tsx` (Composition Root / Container de Injeção):**
   - É o componente consumido pelas rotas (`src/routes/`).
   - Resolve as dependências reais via Inversify Container (`container.get(...)`).
   - Envelopa a View passando `{ states, actions }`.
2. **`[nome].controller.tsx` (ViewModel):**
   - Contém toda a lógica de estado (`useState`), efeitos e handlers da tela.
   - Recebe os serviços e dependências via **parâmetros de injeção** (permitindo mock total).
   - Retorna exclusivamente dois objetos: `states` (dados prontos para exibição) e `actions` (callbacks e funções de disparo).
3. **`[nome].view.tsx` (Apresentação Pura / UI Burra):**
   - Não conhece roteamento, HTTP ou containers de injeção.
   - Recebe apenas `states` e `actions` via props e renderiza o JSX.
   - **Perfeita para Storybook e testes de regressão visual.**
4. **`[nome].styles.ts`:**
   - Estilização isolada da tela (Tailwind, styled-components ou tokens CSS).

> ⚠️ **Regra de Ouro Corporativa:**
> O padrão quádruplo é **obrigatório para Páginas**, mas **proibido para Componentes Simples (`src/components` e `src/design-system`)**. Componentes atômicos (como um `Button` ou `UserCard`) devem permanecer diretos em 1 arquivo para evitar burocracia e fadiga de arquivos.

---

### ⚙️ Backend: Clean Architecture com Domínio Anêmico
📁 Localização: [`blueprints/medium-large/backend/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/backend/README.md)

O Backend reflete a **mesma estrutura do Frontend**, adaptado para o contexto de servidor (onde não existe View, e a camada `src/` atua como entrega/apresentação HTTP).

```text
backend/
├── business/
│   ├── domain/             # Entidades anêmicas (OrderEntity: estado e dados puros)
│   ├── application/        # Casos de uso com as regras de negócio (CreateOrderUseCase)
│   ├── repository/         # Interfaces e implementações de banco (OrderPostgresRepository)
│   └── ioc/                # Inversify Container e tokens TYPES
│
├── src/                    # Camada de Entrega HTTP (Controllers com Zod, Routes, Middlewares)
├── config/                 # Fachadas (Facades) para infraestrutura (Database, Logger)
└── utils/                  # safeParseWithLogging e gerador de IDs
```

---

#### 🧠 Por que Domínio Anêmico no Backend?

Muitos projetos tentam aplicar Domain-Driven Design (DDD) clássico com entidades ricas (`order.confirm()`, `order.calculateTaxes()`), mas acabam enfrentando uma fricção enorme ao mapear essas classes com ORMs modernos (Prisma, Drizzle, Kysely) e bancos relacionais.

**Nossa abordagem pragmática:**
1. **A Entidade (`domain/entities/order.entity.ts`) é ANÊMICA:** Ela é apenas uma portadora de dados tipada e validada pelo Zod. Zero métodos de regra embutidos.
2. **O Caso de Uso (`application/use-cases/create-order.use-case.ts`) GOVERNA as Regras:** Toda validação de negócio, transição de status e orquestração com repositórios e mensageria acontece no Use Case.

#### ✅ Ganhos:
- **Integração transparente com Banco/ORM:** A entidade mapeia de forma 1:1 com as tabelas do banco de dados sem conversores complexos.
- **Testes unitários ultra-rápidos:** O Caso de Uso é testado em Node puro injetando mocks das interfaces `IOrderRepository` e `ILoggerFacade`.
- **Simetria Cognitiva:** Quem trabalha no Front entende o Back instantaneamente porque a estrutura de pastas e contratos é idêntica.

---

### 🛡️ Padrão Facade em `config/` (Frontend & Backend)

Tanto no Front quanto no Back, pacotes NPM de terceiros **nunca são importados diretamente dentro do código de negócio ou das telas**.
- No Front: O Fetch nativo ou Axios fica encapsulado em [`config/facades/http.facade.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/config/facades/http.facade.ts).
- No Back: O driver do Postgres fica encapsulado em [`config/facades/database.facade.ts`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/backend/config/facades/database.facade.ts).

**Propósito e Ganho:** Se uma biblioteca de terceiros tiver uma falha de segurança (CVE), for depreciada ou precisar ser trocada, altera-se **um único arquivo** de fachada, sem tocar em nenhuma das 50 páginas ou nos 30 casos de uso do sistema.

---

### 🔍 Validação Segura com `safeParseWithLogging` em `utils/`

Localizada na camada mais externa (`utils/schema-validator.ts`), essa função utilitária pura resolve o problema de dados corrompidos:
1. Executa o `safeParse` do Zod sobre a entrada ou resposta da API.
2. Se houver divergência, emite um log estruturado em JSON com a severidade correta:
   - `warn`: para divergências não bloqueantes ou dados parciais.
   - `error`: para falhas críticas de quebra de contrato.
3. Garante o princípio **Fail-Fast**: a aplicação interrompe o fluxo imediatamente com um erro descritivo em vez de renderizar `undefined` ou salvar lixo no banco de dados.

---

## 📊 Matriz Comparativa Consolidada

| Aspecto | Tier 1: Small (Pequeno) | Tier 2 & 3: Medium/Large (Médio e Grande) |
| :--- | :--- | :--- |
| **Padrão Frontend** | Monólito Single-File (1 arquivo por tela) | Clean MVVM com IoC (Inversify) e Quarteto em Páginas |
| **Padrão Backend** | Monólito Minimalista em 1 ou 2 arquivos | Clean Architecture com Domínio Anêmico e Use Cases |
| **Inversão de Controle (IoC)** | Nenhuma (chamadas e instâncias diretas) | InversifyJS obrigatório via Tokens `Symbol.for` |
| **Validação de Contratos** | Validação condicional simples | Schemas Zod com `safeParseWithLogging` e severidades |
| **Testabilidade** | Testes de ponta a ponta (E2E) ou integração | Testes unitários puros isolados (Node puro sem DOM/banco) |
| **Velocidade Inicial** | ⚡ Máxima (entrega em horas/dias) | ⏱️ Moderada (exige criar interfaces, types e binds) |
| **Custo de Manutenção a Longo Prazo** | ⚠️ Alto se o projeto crescer | 💎 Baixo (refatorações seguras e sem conflitos de time) |

---

## 📋 Diretrizes Corporativas Transversais ([`guidelines/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines))

Independentemente do Tier adotado, os projetos devem respeitar as seguintes diretrizes:
1. [`api-standards.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/api-standards.md): Erros em formato RFC 7807 (Problem Details), paginação forçada e idempotência em mutações.
2. [`security-baseline.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/security-baseline.md): Fail-fast no startup com validação de variáveis de ambiente via Zod e menor privilégio.
3. [`observability.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/observability.md): Logs estruturados em JSON com `timestamp`, `level` e IDs de correlação, além de endpoints `/health/live` e `/health/ready`.
4. [`contracts.md`](file:///home/castro/Documentos/Personal/Architecture-new-flow/guidelines/contracts.md): Sincronização tipada de contratos entre Frontend e Backend via OpenAPI.
