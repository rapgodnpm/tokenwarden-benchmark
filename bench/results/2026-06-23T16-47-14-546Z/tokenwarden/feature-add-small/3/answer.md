Now I'll add the 'title' mode support. The existing pattern uses `if (mode === '...')`, and the test expects `'Hello Benchmark World'` for `'hello benchmark world'`.







Done.

**Changes:**
- `bench-targets/feature/src/formatTitle.mjs`: Added title-case mode using `mode === 'title'`

**Command run:**
```bash
node --test bench-targets/feature/formatTitle.test.mjs
```

**Verification status:** ✓ Pass (1 test, 0 failures)
