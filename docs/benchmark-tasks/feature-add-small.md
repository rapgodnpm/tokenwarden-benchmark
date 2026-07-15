# Small feature addition

**In short:** The model must add title-case formatting to an existing mode-based formatter.

## What happens

The fixture's `formatTitle()` function already supports `plain`, `upper`, and `lower` behavior. The model must add a `title` mode using the same simple pattern and without adding a dependency.

## What it measures

Extending a small API in the style of the existing code while keeping old behavior intact.

## How it passes

`node --test bench-targets/feature/formatTitle.test.mjs` must show that `hello benchmark world` becomes `Hello Benchmark World` and that the existing lowercase mode still works.

Primary file: `bench-targets/feature/src/formatTitle.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
