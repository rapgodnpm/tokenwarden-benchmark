The build fails because `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. I'll rename the property to match.







**Fix Applied**
- **File**: `bench-targets/build-failure/src/config.mjs`:2
- **Change**: `entries` → `entryPoints`

**Verification Status**: ✅ Passing (`node bench-targets/build-failure/build.mjs` outputs `build ok`)
