The issue is clear: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I need to rename the property.







Build passes successfully.

**Fix Summary:**
- Changed `entries` to `entryPoints` in `src/config.mjs` (line 2)
- Preserved existing entry path (`src/index.js`) and output directory (`dist`) semantics

**Verification:**
```
node bench-targets/build-failure/build.mjs
build ok
```
