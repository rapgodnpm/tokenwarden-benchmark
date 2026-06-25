The issue is clear: `config.mjs` exports a `config` object with property `entries`, but `build.mjs` checks for `entryPoints` (line 3). These property names don't match.

Fix by changing `entries` to `entryPoints` in `config.mjs`:







**Fixed.** Changed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs:2`.

**Verification:** `node bench-targets/build-failure/build.mjs` outputs `build ok`.
