

Output created: `bench-artifacts/code-review-diagnosis.md`

Source file unchanged.

**Findings identified:**
- Missing amount validation (chargeCustomer, refundCustomer)
- Missing gateway error handling (chargeCustomer, refundCustomer)
- Missing customer validation (refundCustomer)

**Residual risks:** Rate limiting, currency validation, idempotency, audit logging
