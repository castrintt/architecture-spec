# 🌐 API Standards Guidelines

Baseline corporate guideline applicable across all project tiers (Small and Medium/Large). Ensures consistency for client applications, SDK generators, and observability systems.

---

## 1. Standard Error Envelope (RFC 7807 - Problem Details)

No API endpoint may return plain unstructured strings or ad-hoc error formats (`{ "error": "msg" }`). All errors must adhere to the RFC 7807 specification:

```json
{
  "type": "https://api.company.com/errors/resource-not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Order #12345 was not found for the specified account.",
  "instance": "/orders/12345",
  "code": "ORDER_NOT_FOUND",
  "timestamp": "2026-11-10T14:00:00Z"
}
```

---

## 2. Mandatory Pagination

No list endpoint may return unbounded collections.
- **Query Parameters:** `page` and `limit` (or cursor-based pagination for high-volume endpoints).
- **Upper Bound Enforcement:** The backend must clamp limits via `limit = Math.min(request.limit, 100)`.

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

## 3. Idempotency on Critical Mutations

For payment or transaction creation endpoints (`POST /payments`, `POST /orders`), clients must supply an `Idempotency-Key: <UUIDv4>` header. Replaying the identical key within 24 hours must return the cached initial response without re-executing the operation.
