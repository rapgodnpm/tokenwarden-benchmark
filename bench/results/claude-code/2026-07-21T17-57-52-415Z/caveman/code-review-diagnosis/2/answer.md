

Found critical bugs in payment.mjs. Writing review document.

## Findings

**1. Missing amount validation in chargeCustomer**
- File: `bench-targets/review/src/payment.mjs:1-5`
- Risk: No validation that amount is positive/valid number
- Impact: Negative or zero amounts can be charged; non-numeric values passed to gateway
- Fix: Add amount check before calling gateway.charge()

**2. Missing amount validation in refundCustomer**
- File: `bench-targets/review/src/payment.mjs:7-10`
- Risk: No validation of amount parameter
- Impact: Negative amounts could refund more than original transaction; zero/negative refunds create compliance issues

**3. No gateway error handling in chargeCustomer**
- File: `bench-targets/review/src/payment.mjs:3`
- Risk: gateway.charge() returns result ignored; no error propagation
- Impact: Silent failures when payment gateway rejects transaction; customer pays but gets no confirmation or error response

**4. No gateway error handling in refundCustomer**
- File: `bench-targets/review/src/payment.mjs:8`
- Risk: gateway.refund() returns result ignored; no error propagation
- Impact: Failed refunds return { ok: true }; downstream systems accept invalid refunds

## Residual Risks

- Amount validation only checks numeric range; does not validate against customer's available balance or billing limits
- Gateway timeouts not handled; infinite blocking if gateway doesn't respond
- Currency/locale validation missing; amounts may be misinterpreted across regions
- No idempotency checks; duplicate charges/refunds possible if retries occur without checking existing transaction
