I can see the issue: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. Let me verify the build failure and fix it.




Confirmed. The config exports `entries` but build.mjs expects `entryPoints`. I'll fix config.mjs to use the expected property name.







**Fix summary:**

**Root cause:** `config.mjs` exports `entries` but `build.mjs` expects `entryPoints` (line 3).

**Fix:** Changed `entries:` to `entryPoints:` in `bench-targets/build-failure/src/config.mjs`

**Verification command:** `node bench-targets/build-failure/build.mjs`

**Verification status:** ✅ Passes (outputs `build ok`)
