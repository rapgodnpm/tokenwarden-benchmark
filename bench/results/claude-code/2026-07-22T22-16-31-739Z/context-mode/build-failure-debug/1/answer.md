

## Summary

**Issue:** Build configuration property mismatch

- `config.mjs` exported `entries` property
- `build.mjs` expected `entryPoints` property

**Fix:** Changed `entries: ['src/index.js']` to `entryPoints: ['src/index.js']` in `/work/context-mode-build-failure-debug-1/repo/bench-targets/build-failure/src/config.mjs`

**Verification:**
```
$ node bench-targets/build-failure/build.mjs
build ok
```

The build script now passes. Entry path (`src/index.js`) and output directory (`dist`) semantics preserved.
