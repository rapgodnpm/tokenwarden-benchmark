The issue is clear: `config.mjs` uses `entries` (line 2) while `build.mjs` checks `entryPoints` (line 3). I need to change `entries` to `entryPoints` in config.mjs.







**File Path:** `bench-targets/build-failure/src/config.mjs`  
**Fix:** Changed property `entries` to `entryPoints` (line 2→3)  
**Verification:** `node bench-targets/build-failure/build.mjs` → `build ok` ✓
