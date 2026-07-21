

**Summary:**

- **File modified:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added support for the `'title'` mode using the existing pattern:
  ```javascript
  if (mode === 'title') return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  ```
- **Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Verification status:** ✅ **PASS** - All 1 test passed
