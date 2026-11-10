# 🟡🔴 Blueprint: Frontend para Projetos Médios e Grandes (Clean MVVM Adaptado)

Arquitetura desenhada para evitar microsserviços e permitir que múltiplos desenvolvedores trabalhem sem acoplamento e sem overengineering.

---

## 🏗️ Divisão das 4 Macro-Camadas

### 1. `business/` (A inteligência da aplicação desacoplada da UI)

Todas as subcamadas de negócio (exceto `ioc/` e `src/`) seguem a separação rigorosa entre contratos e implementações:
- `contracts/`:
  - `interfaces/`: Contratos de interface TypeScript puros (`IOrderApiGateway`, `IOrderApplicationService`, `ILocalCacheRepository`, `IOrderEntity`).
  - `types/`: Conversão e validação com Zod a partir do tipo cru nativo, exportando **ambos** (o tipo cru de rede e o tipo inferido do Zod `z.infer<typeof ...>`).
- Implementações:
  - `api/gateway/`: Classes de Gateway HTTP (`OrderApiGateway`) que implementam as interfaces e consomem o Zod com `safeParseWithLogging`.
  - `application/services/`: Serviços de orquestração de tela (`OrderApplicationService`).
  - `repository/repositories/`: Repositórios de persistência interna (`LocalStorageRepository`).
  - `domain/entities/`: Entidades ricas/anêmicas de domínio (`OrderEntity`).
  - `shared/adapters/`: Padrões de projeto (`OrderDtoToEntityAdapter`).
- `ioc/`: Inversão de Controle com **InversifyJS**. Define os tokens (`TYPES` via `Symbol.for`) e centraliza o `Container` ligando as interfaces aos singletons concretos.

### 2. `config/` (Fachadas para Libs Externas)
Segue a mesma estrutura de contratos:
- `contracts/interfaces/`: Contratos agnósticos (`IHttpFacade`, `IAnalyticsFacade`).
- `contracts/types/`: Tipos nativos e schemas de resposta (`HttpResponse<T>`, `AnalyticsProperties`).
- `facades/`: Implementações isoladas (`NativeHttpFacade`, `ConsoleAnalyticsFacade`). Nenhuma tela ou service conhece Axios, Fetch nativo ou Sentry diretamente.

### 3. `src/` (A camada de View / Apresentação)

#### 📐 Padrão Obrigatório para Páginas (`src/pages/`):
Cada página segue estritamente a segregação em 4 arquivos especialistas (conforme demonstrado em [`src/pages/checkout/`](file:///home/castro/Documentos/Personal/Architecture-new-flow/blueprints/medium-large/frontend/src/pages/checkout)):
- `[nome].base.tsx`: **Composition Root / Container**. Injeta os serviços reais da camada `business` no controller e envelopa a View passando `{ states, actions }`. É o arquivo consumido pelas rotas.
- `[nome].controller.tsx`: **ViewModel**. Contém a lógica de tela e hooks, recebendo serviços via parâmetros de injeção. Retorna rigorosamente dois objetos: `states` (dados prontos para exibição) e `actions` (funções e callbacks).
- `[nome].view.tsx`: **UI Burra**. Não conhece serviços nem rotas; recebe apenas `states` e `actions` via props. Perfeita para Storybook e testes de regressão visual.
- `[nome].styles.ts`: Estilização isolada da tela.

> ⚠️ **Regra de Ouro Corporativa:** Esse quarteto é **obrigatório para Páginas**, mas **proibido para Componentes Reutilizáveis simples** (`src/components` e `src/design-system`), onde componentes diretos em 1 ou 2 arquivos evitam burocracia e fadiga de arquivos (*file fatigue*).

- `components/`: Componentes visuais compostos.
- `design-system/`: Componentes atômicos e tokens (Botões, Inputs, Modais base).
- `globals/`: Temas de cores, estilos CSS globais e constantes visuais.
- `routes/`: Definição de rotas e navegação.
- `store/`: Estado compartilhado entre telas (agnóstico a framework, ex: sessão).
- `guards/`: Proteção e bloqueio de rotas privadas (RBAC, autenticação).
- `hooks/`: Conectores agnósticos entre a camada de Business e a View (estilo Context/Composables).

### 3. `config/` (Fachadas para Libs Externas)
- Isola pacotes NPM usando o padrão **Facade**. Se a biblioteca de HTTP (Axios), de Telemetria (Sentry) ou de Toast mudar, altera-se apenas o arquivo de fachada em `config/`, sem tocar na UI.

### 4. `utils/` (Funções Puras Globais)
- `schema-validator.ts`: Função auxiliar `safeParseWithLogging` para validação com Zod e emissão de logs estruturados com severidades (`warn`/`error`) em caso de quebra de contrato na camada de API.
- `calculations.ts`: Helpers, cálculos matemáticos e formatações de moedas e datas acessíveis por qualquer camada.

---

## ⚖️ O que escala vs. O que não escala
- **O que escala:**
  - Telas podem ser trocadas ou refatoradas sem alterar uma linha da lógica de negócios.
  - Testes unitários rápidos rodando em Node puro sem precisar montar DOM.
  - Crescimento de equipe sem conflitos de merge.
- **O que NÃO escala:**
  - Usar esta arquitetura em um projeto Tier 1 (Small) com 1 dev para um formulário simples (gera excesso de arquivos para pouca regra).

