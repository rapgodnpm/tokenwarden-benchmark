# Code review diagnosis

**In short:** The model must review payment code, identify concrete risks, and write a findings-first report without editing the source.

## What happens

The fixture adds charge and refund functions that call a payment gateway. The code does not validate payment amounts and does not handle gateway errors.

The model must create `bench-artifacts/code-review-diagnosis.md` with `Findings` and `Residual Risks` sections. It must describe both problems based on the actual code.

## What it measures

Code-review judgment, clear risk communication, grounding findings in source, and following a no-edit constraint.

## How it passes

The automated check passes when `bench-artifacts/code-review-diagnosis.md` exists and contains `# Code Review Diagnosis`, `missing amount validation`, and `gateway error handling`.

The prompt also requires `Findings` and `Residual Risks` sections and forbids edits to `bench-targets/review/src/payment.mjs`. The automated check does not enforce those additional instructions.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
