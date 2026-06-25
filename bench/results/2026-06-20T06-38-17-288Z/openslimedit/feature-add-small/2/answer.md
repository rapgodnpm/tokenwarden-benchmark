Added `'title'` mode support to `formatTitle.mjs`:
- File: `bench-targets/feature/src/formatTitle.mjs`
- Edits the `if (mode === 'title')` branch to capitalize each word by converting to lowercase, splitting on spaces, capitalizing each word, and rejoining.
- Added `'title'` case check before the plain mode return

```js
if (mode === 'title') {
  return value.toLowerCase().split(' ').map((word, i) => {
    return i === 0
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word.charAt(0).toUpperCase() + word.slice(1)
  }).join(' ')
}
```

**Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` - **PASS** (1 test, 0 failures)
