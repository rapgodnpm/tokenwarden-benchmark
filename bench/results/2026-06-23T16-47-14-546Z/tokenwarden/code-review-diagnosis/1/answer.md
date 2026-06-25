Done. Created `bench-artifacts/code-review-diagnosis.md` with findings-first format.

**Files/Commands Run:**
- Read: `bench-targets/review/src/payment.mjs`
- Write: `bench-artifacts/code-review-diagnosis.md`

**Key Risks Identified:**
- 6 concrete findings: missing amount validation (chargeCustomer & refundCustomer), no gateway error handling (both functions), incomplete customer validation, no transaction logging
- 5 residual risks: silent failures, fraud enablement, data integrity issues, infinite refund loop, reconciliation impossibility

**Modified:** No source files changed.
