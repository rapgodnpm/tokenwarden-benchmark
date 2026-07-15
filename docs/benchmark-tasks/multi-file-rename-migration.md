# Multi-file API rename

**In short:** The model must rename a public function everywhere without changing what it does.

## What happens

The fixture exports `oldFormatUser()` from one file and re-exports it from another, while the test expects `formatUserLabel()`.

The model must update the implementation, export, and references, preserve the formatted output, and remove stale `oldFormatUser` references from source files.

## What it measures

Tracing a public symbol across files, completing a small migration, and preserving behavior.

## How it passes

The formatter test must pass, and `grep` must find no `oldFormatUser` reference under `bench-targets/rename/src`.

Primary files: `bench-targets/rename/src/format-user.mjs` and `bench-targets/rename/src/index.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
