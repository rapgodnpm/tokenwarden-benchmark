

Fixed and verified. The build now passes with `build ok`.

## Summary

| Item | Value |
|------|-------|
| **Issue** | `config.mjs` exported `entries` but `build.mjs` expected `entryPoints` |
| **File changed** | `bench-targets/build-failure/src/config.mjs` |
| **Change** | Renamed `entries: [...]` to `entryPoints: [...]` |
| **Verification** | `node bench-targets/build-failure/build.mjs` → `build ok` |
