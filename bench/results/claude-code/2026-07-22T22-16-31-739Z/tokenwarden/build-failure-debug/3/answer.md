

Build verification passed. The fix is complete.

## Summary

**Issue:** The configuration file exported `entries` but the build script expected `entryPoints`.

**Fix:** Changed `entries` to `entryPoints` in the config file.

**Changes Made:**
- `/work/tokenwarden-build-failure-debug-3/repo/bench-targets/build-failure/src/config.mjs`: renamed `entries` property to `entryPoints`

**Verification Status:**
```
$ node bench-targets/build-failure/build.mjs
build ok
```

The existing entry path (`src/index.js`) and output directory (`dist`) semantics are preserved.
