# CLI flag parsing fix

**In short:** The model must expand a minimal argument parser to handle common CLI syntax.

## What happens

The seeded parser treats every `--...` argument as a boolean flag. The model must add support for:

- boolean flags such as `--verbose`;
- separated values such as `--count 3`;
- inline values such as `--output=dist`;
- positional arguments such as `src/index.js`.

The implementation must stay small and dependency-free.

## What it measures

Following a compact behavioral specification, handling parser edge cases, and resisting unnecessary dependencies or rewrites.

## How it passes

`node --test bench-targets/cli-flags/parseArgs.test.mjs` compares the parsed result with the expected flags, values, and positional arguments.

Primary file: `bench-targets/cli-flags/src/parseArgs.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
