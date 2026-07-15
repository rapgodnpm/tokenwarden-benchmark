# Typecheck error flood debugging

**In short:** The model must find one missing schema field behind 60 repeated errors.

## What happens

The fixture defines a user schema with `id` and `name`. The checker also requires `email`, then prints the same missing-field problem 60 times.

The model must fix the small root cause rather than reacting to each repeated error.

## What it measures

Reading through noisy diagnostics, tracing them back to their source, and choosing a focused fix.

## How it passes

`node bench-targets/typecheck-flood/typecheck.mjs` must exit successfully with no missing required fields.

Primary file: `bench-targets/typecheck-flood/src/schema.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
