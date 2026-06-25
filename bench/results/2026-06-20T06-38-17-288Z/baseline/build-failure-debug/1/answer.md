I found the issue: `config.mjs` uses `entries` but `build.mjs` checks for `entryPoints`. Let me run the build to verify and then fix it.




Fixed by renaming `entries` to `entryPoints` in config.mjs:







**Fixed in bench-targets/build-failure/src/config.mjs**

Changed property name from `entries` to `entryPoints` to match what build.mjs expects.

**Verification:**
```
node bench-targets/build-failure/build.mjs
build ok
```
✅ Build passes
