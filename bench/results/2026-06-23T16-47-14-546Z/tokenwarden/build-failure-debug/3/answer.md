The issue is clear: config defines `entries` but build checks for `entryPoints`. Let me verify the error and fix it.










Fixed the property name mismatch.

- **File changed**: `bench-targets/build-failure/src/config.mjs`
- **Change**: `entries` → `entryPoints` (line 2)
- **Command**: `node bench-targets/build-failure/build.mjs`
- **Status**: ✅ `build ok`
