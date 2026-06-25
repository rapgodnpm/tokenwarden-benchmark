**Exact file path:** `/private/tmp/tokenwarden-bench/2026-06-20T06-38-17-288Z/openslimedit-feature-add-small-3/repo/bench-targets/feature/src/formatTitle.mjs`

**Change made:** Added title-case mode support following the existing pattern:
```javascript
if (mode === 'title') {
  const words = value.split(' ')
  return words.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
}
```

**Verification:** Ran `node --test bench-targets/feature/formatTitle.test.mjs` - **PASSED** (1 pass, 0 fail)
