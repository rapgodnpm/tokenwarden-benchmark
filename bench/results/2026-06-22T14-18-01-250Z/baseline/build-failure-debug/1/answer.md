The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I'll fix `build.mjs` to check the correct property.








**Fix applied to:** `bench-targets/build-failure/build.mjs`

Changed `entryPoints` to `entries` (lines 3 and 4) to match the config export.

**Verification status:** ✓ Passed (`build ok`)
