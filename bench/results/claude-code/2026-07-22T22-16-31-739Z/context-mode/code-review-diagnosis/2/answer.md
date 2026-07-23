

Created `bench-artifacts/code-review-diagnosis.md` with a code review of `bench-targets/review/src/payment.mjs`.

## Summary

**File analyzed:** `bench-targets/review/src/payment.mjs` (10 lines, 2 functions)

**Key findings:**

1. **Missing amount validation** — No checks for positive, non-zero amounts before passing to gateway
2. **Missing gateway error handling** — Both `charge` and `refund` calls have no try/catch or error checks
3. **Incomplete customer validation** — Only checks for `customer.id`, not object validity
4. **Missing type validation** — No type checks for inputs

**Residual risks identified:** Financial loss, silent failures, security vulnerabilities, and debugging difficulties.
