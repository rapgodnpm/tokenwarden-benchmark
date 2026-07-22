

Build verification successful. Here's the summary:

## Fix Applied

**File:** `bench-targets/build-failure/src/config.mjs`

**Change:** Renamed `entries` to `entryPoints` to match the expected config structure.

```diff
 export default {
-  entries: ['src/index.js'],
+  entryPoints: ['src/index.js'],
   outDir: 'dist'
 }
```

**Verification Status:** ✅ PASS
```
$ node bench-targets/build-failure/build.mjs
build ok
```
