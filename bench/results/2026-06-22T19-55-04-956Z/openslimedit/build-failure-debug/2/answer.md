**Fix applied:** Changed `entries` to `entryPoints` in bench-targets/build-failure/src/config.mjs:1 for property name consistency with build.mjs.

**Verification:** `node bench-targets/build-failure/build.mjs` → outputs "build ok" ✅
