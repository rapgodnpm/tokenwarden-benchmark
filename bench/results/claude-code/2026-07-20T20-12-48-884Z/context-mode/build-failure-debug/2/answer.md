

**Fix complete.**

| Item | Detail |
|------|--------|
| **File fixed** | `bench-targets/build-failure/src/config.mjs` |
| **Change** | Renamed `entries` → `entryPoints` in the exported config object |
| **Command run** | `node bench-targets/build-failure/build.mjs` |
| **Verification status** | `build ok` ✓ |

The build configuration was using `entries` but the validator in `build.mjs` expected `entryPoints`. The smallest safe fix was to rename the property key.
