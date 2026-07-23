

Done.

**File created:** `bench-artifacts/code-review-diagnosis.md`

**Findings extracted from:** `bench-targets/review/src/payment.mjs`

| Issue | Severity | Location |
|-------|----------|----------|
| Missing amount validation (chargeCustomer) | Critical | line 1-5 |
| Missing amount validation (refundCustomer) | Critical | line 7-10 |
| Unhandled gateway errors (chargeCustomer) | Critical | line 3 |
| Unhandled gateway errors (refundCustomer) | Critical | line 8 |
| Missing customer ID guard (refundCustomer) | High | line 7-10 |
| Incomplete return contract (no transactionId) | Medium | line 1-10 |

No source file edits made.
