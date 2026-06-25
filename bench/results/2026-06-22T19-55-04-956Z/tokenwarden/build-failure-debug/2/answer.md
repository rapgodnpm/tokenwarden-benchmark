I see the issue. The config file uses `entries` but build.mjs checks for `entryPoints` (different property name). Let me run the build command to confirm the failure:




The config exports `entries` but build.mjs checks for `entryPoints`. I'll fix config.mjs to use the correct property name:







Fix: Changed `entries` to `entryPoints` in `bench-targets/build-failure/src/config.mjs` to match the validation keys expected by `build.mjs`.

- File edited: bench-targets/build-failure/src/config.mjs
- Command run: node bench-targets/build-failure/build.mjs
- Verification status: pass
