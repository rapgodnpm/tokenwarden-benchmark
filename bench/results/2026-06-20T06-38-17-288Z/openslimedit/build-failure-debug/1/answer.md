I see the issue: `config.mjs` uses `entries` while `build.mjs` expects `entryPoints`. Let me verify the build failure first.




The error confirms the property name mismatch. Fixing `config.mjs` to use `entryPoints` instead of `entries`:







**Fix:** Changed `entries` to `entryPoints` in bench-targets/build-failure/src/config.mjs

**Verification:** `node bench-targets/build-failure/build.mjs` outputs `build ok` ✓

---

**Files and commands:**
- `bench-targets/build-failure/src/config.mjs:2` - Fixed property name from `entries` to `entryPoints`
- Ran `node bench-targets/build-failure/build.mjs` - Passed
