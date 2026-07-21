

Added title-case support to `bench-targets/feature/src/formatTitle.mjs`:

**Change made:**
- Added `if (mode === 'title')` branch using `value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())`
- Follows the existing mode-based pattern (`upper`, `lower`, `title`, `plain`)

**Verification:**
- Command: `node --test bench-targets/feature/formatTitle.test.mjs`
- Result: **1 pass, 0 fail**

The `formatTitle('hello benchmark world', 'title')` now correctly returns `'Hello Benchmark World'`.
