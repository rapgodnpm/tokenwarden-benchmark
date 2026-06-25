The issue is clear: config.mjs exports `entries` but build.mjs checks for `entryPoints`. This property mismatch causes the build to fail.







**Fix applied.** Changed `entries` to `entryPoints` in [`config.mjs`](bench-targets/build-failure/src/config.mjs):1 (line 2).

**Verification:** `node build.mjs` outputs `build ok`.
