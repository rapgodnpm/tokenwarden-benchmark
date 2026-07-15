# Large test log debugging

**In short:** The model must find one obvious implementation bug despite 80 repetitive test failures.

## What happens

The fixture adds an `add(a, b)` function that subtracts instead of adding. A generated suite repeats the resulting failure 80 times.

The model must diagnose the shared root cause and fix the implementation without rewriting the tests.

## What it measures

Ignoring noisy output, finding the single cause behind many failures, and making a minimal source change.

## How it passes

The automated check passes when every case in `node --test bench-targets/large-log/math.test.mjs` passes. The prompt also says not to rewrite the tests, but the automated check does not enforce that instruction.

Primary file: `bench-targets/large-log/src/math.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
