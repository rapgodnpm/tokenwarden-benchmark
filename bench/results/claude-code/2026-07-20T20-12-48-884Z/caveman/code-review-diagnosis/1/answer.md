

Diagnosis complete.

**Source file:** `bench-targets/review/src/payment.mjs` — unmodified.

**Output:** `bench-artifacts/code-review-diagnosis.md`

**Findings:**
- R1: No amount validation (accepts negative/NaN)
- R2: No gateway error handling (silent `{ok: true}`)
- R3: Missing customer.id check in refundCustomer
- R4: No logging on failure

**Residual risks:** gateway side effects, currency normalization missing, customer tampering.
