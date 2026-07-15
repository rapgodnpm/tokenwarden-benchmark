# Documentation from code

**In short:** The model must turn a small cache implementation into accurate user-facing API documentation.

## What happens

The fixture adds `createCache()`, which stores values in a `Map` and exposes four methods: `get`, `set`, `delete`, and `clear`.

The model must read that implementation and create `bench-artifacts/cache-api.md`. The document must explain `createCache()` and all four methods without inventing behavior or editing source code.

## What it measures

Extracting a public contract from implementation code and explaining it clearly and accurately.

## How it passes

The automated check passes when the document exists, contains `# Cache API` and `createCache()`, and mentions `get`, `set`, `delete`, and `clear`.

The prompt also requires `Methods` and `createCache()` sections, factual implementation-based copy, and no source edits. The automated check does not enforce those additional instructions.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
