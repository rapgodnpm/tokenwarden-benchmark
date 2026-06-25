The current `formatTitle` function has 'upper', 'lower', and 'plain' modes. I need to add 'title' mode. Let me add the title-case implementation:







**Verification Status:** ✓ PASS

| Item | Details |
|------|---------|
| File edited | `bench-targets/feature/src/formatTitle.mjs` |
| Change | Added `title` mode: `value.replace(/\b\w/g, char => char.toUpperCase())` |
| Command run | `node --test bench-targets/feature/formatTitle.test.mjs` |
| Result | 1 test passed, 0 failed |

The regex `/\\b\\w/g` matches the first word character at each word boundary, converting each to uppercase while leaving the rest unchanged.
