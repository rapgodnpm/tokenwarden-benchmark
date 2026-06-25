I'll start by reading the two files to understand the existing implementation and test structure.





Now I understand the existing code. The `formatTitle` function has `upper` and `lower` modes, but needs a `title` mode. I'll add the title case implementation and verify the tests pass.




Now I'll verify the tests pass:




All tests pass. Let me also run the full test suite to ensure the change doesn't break other tests:




The directory-based test failed because there are multiple test files. Let me list and run them individually:




**File edit:**
- `bench-targets/feature/src/formatTitle.mjs` - Added `title` mode implementation using `value.replace(/\b\w/g, c => c.toUpperCase())` following the existing pattern.

**Commands run:**
```bash
node --test bench-targets/feature/formatTitle.test.mjs
node --test bench-targets/feature/*.test.mjs
```

**Verification status:** All tests pass (1 passed, 0 failed).
