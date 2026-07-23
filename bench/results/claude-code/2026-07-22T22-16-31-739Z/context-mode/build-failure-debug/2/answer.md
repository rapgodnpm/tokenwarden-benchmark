

The build configuration failure has been fixed.

## Summary

**Issue:** The config file used `entries` as the property name, but the build script expected `entryPoints`.

**Fix:** Changed `entries: ['src/index.js']` to `entryPoints: ['src/index.js']` in `src/config.mjs`.

## Verification Status

| Item | Status |
|------|--------|
| Entry path preserved (`src/index.js`) | ✅ |
| Output directory preserved (`dist`) | ✅ |
| Build script passes | ✅ |

```
node bench-targets/build-failure/build.mjs
build ok
```
