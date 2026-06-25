The issue is a property name mismatch: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. Need to fix the property name in `config.mjs` to match what `build.mjs` expects.







**Issue:** `config.mjs` exported property `entries` but `build.mjs` expected `entryPoints`.

**Fix:** Renamed property from `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs` (line 2).

**Verification:** Build passes with "build ok" output.
