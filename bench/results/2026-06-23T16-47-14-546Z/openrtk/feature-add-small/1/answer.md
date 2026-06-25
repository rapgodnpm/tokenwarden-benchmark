I need to add a `title` mode case that converts text to title case. I'll add it after the `lower` case and before the fallback return.







Added title-case support to `bench-targets/feature/src/formatTitle.mjs` using the existing mode-based pattern. The test passes.

**File changed:**
- `bench-targets/feature/src/formatTitle.mjs` - Added `title` mode with `split(' ').map(...).join(' ')` pattern

**Command run:**
- `node --test bench-targets/feature/formatTitle.test.mjs`

**Verification status:**
- 1 test passed, 0 failed
