**Summary**

- **File changed**: `bench-targets/feature/src/formatTitle.mjs`
- **Change added**: Title case mode handling at line 4:
  ```javascript
  if (mode === 'title') return value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  ```
- **Command run**: `node --test bench-targets/feature/formatTitle.test.mjs`
- **Verification status**: PASS (1 test, 0 failures)
