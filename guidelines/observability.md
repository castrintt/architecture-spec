# 🔭 Diretrizes de Observabilidade (Observability Baseline)

Aplicações sem observabilidade são caixas-pretas que tornam incidentes caros e lentos para resolver.

---

## 1. Logs Estruturados em JSON

Todo log emitido em produção deve ser em formato JSON (utilizando bibliotecas como `pino`, `winston` ou `zerolog`), contendo obrigatoriamente:
- `timestamp`: ISO 8601
- `level`: info, warn, error, fatal
- `traceId` e `spanId`: para correlação
- `message`: mensagem humana clara
- `context`: objeto com IDs de negócio (ex: `userId`, `orderId`)

```json
{
  "timestamp": "2026-11-09T14:15:30.123Z",
  "level": "error",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "message": "Falha na cobrança do cartão",
  "context": {
    "orderId": "ord_9921",
    "providerError": "insufficient_funds"
  }
}
```

---

## 2. Healthchecks Padronizados

Todo backend deve expor dois endpoints:
- `GET /health/live`: responde `200 OK` se o processo estiver rodando.
- `GET /health/ready`: responde `200 OK` apenas se as dependências essenciais (banco de dados, filas críticas) estiverem acessíveis.

