The issue is clear: `config.mjs` exports `entries` and `outDir`, but `build.mjs` expects `entryPoints` and `outDir`. I need to rename `entries` to `entryPoints` in config.mjs.







**Fix applied**
- File: `bench-targets/build-failure/src/config.mjs`
- Changed: `entries` → `entryPoints`

**Verification**
```
node bench-targets/build-failure/build.mjs
build ok
```

The configuration now passes validation while preserving the entry path (`src/index.js`) and output directory (`dist`) semantics.
