# React-style state bug fix

**In short:** The model must fix a cart update that mutates the previous state.

## What happens

The fixture adds a small cart state module, a component that uses it, and a test. The seeded `addItem()` implementation reuses the original state object and pushes into its `items` array.

The model must make the smallest safe fix while preserving the existing exports.

## What it measures

Reading related implementation and UI files, recognizing mutation bugs, and applying an immutable state update without unnecessary changes.

## How it passes

`node --test bench-targets/react-state/useCartState.test.mjs` must prove that:

- the returned state is a new object;
- the previous state is unchanged;
- the new item and total are correct.

Primary files: `bench-targets/react-state/src/useCartState.mjs` and `bench-targets/react-state/src/CartPanel.jsx`.

[See the exact task definition](../../bench/tasks/future.v1.json) and [seeded fixture](../../bench/fixtures/future/create-fixture.mjs).
