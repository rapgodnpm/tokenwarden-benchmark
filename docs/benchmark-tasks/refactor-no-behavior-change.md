# Behavior-preserving refactor

**In short:** The model must remove duplicated whitespace cleanup without changing the module's public behavior.

## What happens

The fixture has separate first-name and last-name formatters with identical trimming and whitespace normalization. The model must move that logic into one small helper named `normalizeName` while keeping both public exports.

## What it measures

Recognizing safe duplication, making a restrained refactor, and preserving API and behavior.

## How it passes

The formatter tests must pass, and verification must find `normalizeName` in `bench-targets/refactor/src/name-formatters.mjs`.

Primary file: `bench-targets/refactor/src/name-formatters.mjs`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
