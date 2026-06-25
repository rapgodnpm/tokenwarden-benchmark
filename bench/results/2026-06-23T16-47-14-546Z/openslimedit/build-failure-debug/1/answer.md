The issue is clear: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. Let me fix this:







**Fix applied:** `bench-targets/build-failure/src/config.mjs:2` - renamed `entries` to `entryPoints`

| Item | Value |
|------|-------|
| File path | `bench-targets/build-failure/src/config.mjs` |
| Command run | `node bench-targets/build-failure/build.mjs` |
| Verification status | ✅ **passed** (`build ok`) |
