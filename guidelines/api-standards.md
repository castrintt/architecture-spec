# 🌐 Diretrizes de API (API Standards)

Diretriz corporativa aplicável a todos os Tiers (Small, Medium e Large). O objetivo é garantir consistência para clientes e ferramentas de observabilidade.

---

## 1. Padrão de Resposta de Erros (RFC 7807 - Problem Details)

Nenhuma API deve retornar strings soltas ou formatos ad-hoc para erros (`{ "error": "msg" }`). Utilize a especificação RFC 7807:

```json
{
  "type": "https://api.empresa.com/errors/resource-not-found",
  "title": "Recurso não encontrado",
  "status": 404,
  "detail": "O pedido #12345 não foi localizado para a conta informada.",
  "instance": "/orders/12345",
  "code": "ORDER_NOT_FOUND",
  "timestamp": "2026-11-09T14:00:00Z"
}
```

---

## 2. Paginação Obrigatória

Nenhum endpoint de listagem pode retornar listas infinitas sem limite explícito.
- **Padrão Paginado:** `page` e `limit` (ou cursor-based para grandes volumes no Tier 3).
- **Limite Máximo:** O servidor deve forçar `limit = min(request.limit, 100)`.

```json
{
  "items": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 152,
    "totalPages": 8
  }
}
```

---

## 3. Idempotência em Mutações Críticas

Para endpoints de criação/pagamento (`POST /payments`, `POST /orders`), exija o header `Idempotency-Key: <UUIDv4>`. Se a mesma chave for reenviada em até 24h, a API deve retornar a mesma resposta sem reprocessar.

