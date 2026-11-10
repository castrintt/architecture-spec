# 🔭 Observability Baseline Guidelines

Applications without proper observability are black boxes that make incident resolution costly and slow.

---

## 1. Structured JSON Logging

All production logs must be emitted in structured JSON format (using libraries such as Pino or Winston) containing:
- `timestamp`: ISO 8601
- `level`: info, warn, error, fatal
- `traceId` and `spanId`: distributed correlation identifiers
- `message`: human-readable description
- `context`: object containing business IDs (e.g., `userId`, `orderId`)

```json
{
  "timestamp": "2026-11-10T14:15:30.123Z",
  "level": "error",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "message": "Payment processing failed",
  "context": {
    "orderId": "ord_9921",
    "providerError": "insufficient_funds"
  }
}
```

---

## 2. Standardized Healthchecks

Every backend service must expose two distinct endpoints:
- `GET /health/live`: responds `200 OK` if the process is running.
- `GET /health/ready`: responds `200 OK` only when critical dependencies (database, broker) are healthy and reachable.
