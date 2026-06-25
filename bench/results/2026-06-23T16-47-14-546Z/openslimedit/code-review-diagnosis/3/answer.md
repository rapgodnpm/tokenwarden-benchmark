**Task Complete**

**File Reviewed:** `bench-targets/review/src/payment.mjs`

**File Created:** `bench-artifacts/code-review-diagnosis.md`

**Findings Summary:**

| Issue | Location | Severity |
|-------|----------|----------|
| Missing amount validation | `chargeCustomer:3-4` | Critical |
| Missing customer.id validation | `refundCustomer:8-9` | Critical |
| Missing gateway error handling | `chargeCustomer:3` | Critical |
| Missing gateway error handling | `refundCustomer:8` | Critical |
| Inconsistent error response format | `chargeCustomer:1-4` | Secondary |
| No transaction confirmation | `chargeCustomer:4` | Secondary |

**Residual Risks Documented:** Rate limiting, idempotency, logging, decimal precision, customer state verification.
