# Build configuration failure

**In short:** The model must fix a property-name mismatch in a small build configuration.

## What happens

The fixture's config uses `entries`, while the build script expects an `entryPoints` array. The existing entry path (`src/index.js`) and output directory (`dist`) are already correct and must keep the same meaning.

## What it measures

Comparing configuration with its consumer, identifying a contract mismatch, and avoiding unrelated configuration changes.

## How it passes

`node bench-targets/build-failure/build.mjs` must print `build ok` and exit successfully.

Primary file: `bench-targets/build-failure/src/config.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
