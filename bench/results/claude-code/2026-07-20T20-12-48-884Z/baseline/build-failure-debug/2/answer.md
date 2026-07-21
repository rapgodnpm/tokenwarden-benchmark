

The build configuration failure is fixed.

**Changes made:**
- **File:** `bench-targets/build-failure/src/config.mjs`
- **Change:** Renamed `entries` to `entryPoints` to match the property name expected by `build.mjs`

**Commands run:**
```bash
node bench-targets/build-failure/build.mjs
```

**Verification status:** ✅ PASS — Output: `build ok`
