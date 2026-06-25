Fixed: Removed unnecessary loop (`for (let index = 0; index < 60; index += 1)`) that emitted 60 duplicate errors.

- **File**: `bench-targets/typecheck-flood/typecheck.mjs`
- **Fix**: Replaced loop with single error message
- **Verification**: `node bench-targets/typecheck-flood/typecheck.mjs` now outputs 1 error instead of 60
