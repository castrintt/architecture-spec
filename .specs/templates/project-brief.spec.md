# 📋 Especificação do Projeto (Project Brief Spec)

> Preencha as seções abaixo para submeter o projeto à avaliação arquitetural automatizada.

---

## 1. Identificação
- **Nome do Projeto:** `[Ex: Portal do Fornecedor]`
- **Responsável Técnico (Tech Lead):** `[Nome / Contato]`
- **Data de Submissão:** `[YYYY-MM-DD]`
- **Objetivo do Negócio (1 parágrafo):**
  > `[Descreva o problema que o software resolve e quem são os usuários finais]`

---

## 2. Métricas Operacionais & Equipe
- **Tamanho do Time Dedicado:** `[ ] 1-2 devs | [ ] 3-7 devs | [ ] 8+ devs`
- **Volume Estimado de Usuários/Requisições:**
  - Requisições por Minuto no Pico (estimativa): `[ ] < 100 | [ ] 100 - 5.000 | [ ] > 5.000`
  - Volume de dados armazenados no 1º ano: `[ ] < 10GB | [ ] 10GB - 500GB | [ ] > 500GB`
- **SLA e Tolerância a Falhas:**
  - `[ ] Baixa criticidade (pode ficar fora do ar fora de horário comercial)`
  - `[ ] Média criticidade (99.5% - downtime gera atrito mas não perda imediata de capital)`
  - `[ ] Alta criticidade (99.99% - transacional financeiro, compliance, auditoria)`
- **Expectativa de Vida Útil do Projeto:**
  - `[ ] Prova de Conceito / MVP rápido (< 6 meses)`
  - `[ ] Produto contínuo da empresa (1 a 3 anos)`
  - `[ ] Plataforma corporativa core (3+ anos)`

---

## 3. Domínio e Integrações
- **Principais Entidades do Sistema:**
  > `[Ex: Usuário, Fornecedor, Pedido de Compra, Fatura]`
- **Integrações Externas Obrigatórias:**
  - `[ ] Nenhuma (sistema autocontido)`
  - `[ ] Gateways de Pagamento / ERP legado / CRM`
  - `[ ] Múltiplos sistemas externos assíncronos`
- **Requisitos Não-Funcionais Especiais:**
  - `[ ] Necessidade de processamento em tempo real (WebSockets / SSE)`
  - `[ ] Processamento assíncrono pesado em lote (Background Jobs / Filas)`
  - `[ ] Regras estritas de LGPD / Compliance bancário`

---

## 4. Decisão Prévia ou Preferência de Stack (se houver restrição rígida)
- **Frontend:** `[Ex: React / Next.js / Nenhum / Aberto a sugestão]`
- **Backend:** `[Ex: Node.js / TypeScript / Go / Python / Aberto a sugestão]`
- **Banco de Dados:** `[Ex: PostgreSQL / SQLite / MongoDB / Aberto a sugestão]`

