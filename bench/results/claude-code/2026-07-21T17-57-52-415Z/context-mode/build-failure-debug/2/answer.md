

## Build Failure Fixed

**Issue:** The config export used `entries` but the build script expected `entryPoints`.

**Fix Applied:**
- File: `bench-targets/build-failure/src/config.mjs`
- Changed: `entries` → `entryPoints`

**Verification:**
```
$ node bench-targets/build-failure/build.mjs
build ok
```

**Preserved semantics:**
- Entry path: `src/index.js` ✓
- Output directory: `dist` ✓
