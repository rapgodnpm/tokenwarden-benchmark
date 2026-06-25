The issue is clear: `build.mjs` expects `entryPoints` but `config.mjs` exports `entries`. Let me fix this.







**Fixed.** The property mismatch between `entries` and `entryPoints` was corrected in `src/config.mjs`.

**Files and changes:**
- `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/openrtk-build-failure-debug-3/repo/bench-targets/build-failure/src/config.mjs:2`
  - Changed `entries: ['src/index.js']` → `entryPoints: ['src/index.js']`

**Verification:**
- Command: `node bench-targets/build-failure/build.mjs`
- Status: ✅ `build ok`
