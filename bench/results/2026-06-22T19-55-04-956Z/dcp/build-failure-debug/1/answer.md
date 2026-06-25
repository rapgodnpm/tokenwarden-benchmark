Fixed the build configuration failure by renaming `entries` to `entryPoints` in `src/config.mjs` to match the build script's expected property name.

**File modified:**
- `bench-targets/build-failure/src/config.mjs` (line 2): `entries` → `entryPoints`

**Commands run:**
```
node bench-targets/build-failure/build.mjs
```

**Verification status:** ✅ Pass
