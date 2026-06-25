The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I need to change `entries` to `entryPoints` in config.mjs.










**File:** `/repo/bench-targets/build-failure/src/config.mjs`

**Fix:** Changed `entries` to `entryPoints` to match what the build script expects

**Verification:** `node /repo/bench-targets/build-failure/build.mjs` → `build ok` ✓
