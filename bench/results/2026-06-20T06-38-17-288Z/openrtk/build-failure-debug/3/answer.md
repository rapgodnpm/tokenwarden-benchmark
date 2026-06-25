The issue is clear: `config.mjs` exports a property `entries` but `build.mjs` checks for `entryPoints` (line 3). I need to change `entries` to `entryPoints` in `config.mjs`:







**Fix Summary:**

**File edited:** `bench-targets/build-failure/src/config.mjs`

**Change:** `entries: ['src/index.js']` → `entryPoints: ['src/index.js']` (property name mismatch)

**Command:** `node bench-targets/build-failure/build.mjs`

**Verification status:** ✅ **PASSED** (`build ok`)
