

I've created the code review diagnosis document. Here's a summary:

## Summary

| Item | Status |
|------|--------|
| File analyzed | `bench-targets/review/src/payment.mjs` |
| Output file | `bench-artifacts/code-review-diagnosis.md` |
| Source file modified | No |

### Key Findings (5 issues identified)

1. **Missing amount validation in `chargeCustomer`** (Line 3) — High severity
2. **Missing amount validation in `refundCustomer`** (Line 8) — High severity  
3. **Missing customer validation in `refundCustomer`** (Line 7) — High severity
4. **Missing gateway error handling** — Both functions — High severity
5. **Missing return value from gateway calls** — Both functions — Medium severity

### Specific Code Issues

```javascript
// Line 3: No validation of amount parameter
gateway.charge(customer.id, amount)

// Line 8: No validation of customer or amount
gateway.refund(customer.id, amount)
```

### Residual Risks Documented

- Currency/precision issues
- Duplicate charge prevention
- Refund authorization
- Rate limiting
- Timeout handling
