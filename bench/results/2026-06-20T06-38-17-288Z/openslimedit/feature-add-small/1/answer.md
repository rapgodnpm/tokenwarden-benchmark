Added title case support to `bench-targets/feature/src/formatTitle.mjs` using the existing mode-based pattern:

```javascript
if (mode === 'title') return value.split(' ').map(word => (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join(' ')
```

**Verification passed** - `node --test` shows 1 test passed, 0 failed.
