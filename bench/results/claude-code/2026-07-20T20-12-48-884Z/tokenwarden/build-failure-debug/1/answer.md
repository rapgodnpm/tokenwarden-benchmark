

The build configuration failure has been fixed.

## Summary

**Issue**: Property name mismatch between `config.mjs` and `build.mjs`. The config exported `entries` but the build script expected `entryPoints`.

**Fix Applied**: 
- Renamed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs` (line 2)

**Verification Status**: ✅ **PASSED**
- Command: `node bench-targets/build-failure/build.mjs`
- Output: `build ok`

The entry path (`src/index.js`) and output directory (`dist`) semantics are preserved as required.
