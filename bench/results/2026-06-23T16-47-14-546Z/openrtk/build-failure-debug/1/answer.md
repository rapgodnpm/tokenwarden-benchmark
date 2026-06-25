The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. Let me fix this.







**Fix applied** to `/private/tmp/tokenwarden-bench/2026-06-23T16-47-14-546Z/openrtk-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`:

- Changed `entries` → `entryPoints` (line 2)
- Kept `outDir: 'dist'` unchanged

**Verification:**
```bash
node bench-targets/build-failure/build.mjs
# Output: "build ok"
```
