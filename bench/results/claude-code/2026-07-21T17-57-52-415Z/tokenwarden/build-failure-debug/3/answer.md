

The build configuration failure is fixed.

## Summary

**Issue:** Property name mismatch between `config.mjs` and `build.mjs`
- `config.mjs` exported `entries` property
- `build.mjs` expected `entryPoints` property

**Fix:** Renamed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs`

**Verification Status:** ✅ `node bench-targets/build-failure/build.mjs` outputs `build ok`
