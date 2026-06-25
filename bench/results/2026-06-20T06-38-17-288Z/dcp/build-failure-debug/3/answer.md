The issue is clear: `config.mjs` uses `entries` but `build.mjs` expects `entryPoints`. Running the build to confirm the error:




The error is confirmed. `config.mjs` defines `entries` but `build.mjs` checks for `entryPoints`. I'll align the config to use the expected property name:














The build.mjs references a `global` configuration. Let me search for where the `entryPoints` property is defined:




Let me check how `global` is used in the build.mjs file:




The code expects a `global` entry to provide the `entryPoints` property. Since there's no global config file, I need to find/create it. Let me check if there's a global build config elsewhere:




The `global` property isn't a standard build config. Looking at the bench.mjs that was removed, it seems the code expects `entryPoints` to be defined as a `global` property. The fix is to update `config.mjs` to merge with a global fallback:




No global config file exists. The build.mjs expects `config.entryPoints` but `config.mjs` has `entries`. The fix is to update `config.mjs` to use `entryPoints` instead of `entries`:







Fix applied. Changed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs:2`. Build passes with "build ok".

**Summary:**
- File: `bench-targets/build-failure/src/config.mjs`
- Line 2: `entries` → `entryPoints`
- Status: ✅ Fixed
