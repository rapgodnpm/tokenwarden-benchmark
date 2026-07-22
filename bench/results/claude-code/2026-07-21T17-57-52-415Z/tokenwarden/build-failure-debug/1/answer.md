

**Fix Summary:**

- **File edited:** `bench-targets/build-failure/src/config.mjs`
- **Change:** Renamed `entries` → `entryPoints` to match the expected property name in `build.mjs`
- **Verification:** `node bench-targets/build-failure/build.mjs` → `build ok`

The build configuration failure has been fixed. The smallest safe change was made - only updating the property name to match what `build.mjs` expects.
