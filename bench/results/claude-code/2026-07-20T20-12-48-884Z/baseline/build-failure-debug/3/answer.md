

## Summary

**Issue Found:** The build configuration property mismatch. The config file exported `entries` but the build script expected `entryPoints`.

**Fix Applied:** Renamed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`

**Verification Status:** ✅ Pass - `node bench-targets/build-failure/build.mjs` outputs `build ok`

### Files Modified
- `/bench-targets/build-failure/src/config.mjs` - Renamed `entries` property to `entryPoints`

The entry path (`src/index.js`) and output directory (`dist`) semantics are preserved as required.
