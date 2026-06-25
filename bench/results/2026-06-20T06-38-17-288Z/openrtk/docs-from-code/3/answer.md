I'll start by reading the cache.mjs file to understand the implementation.




Now I'll write the documentation based on the implementation.










Documentation created at `/bench-artifacts/cache-api.md`:

**File created:** `bench-artifacts/cache-api.md` (2.0K)

**Content includes:**
- ✅ `# Cache API` heading
- ✅ `## createCache()` section with description and example
- ✅ `## Methods` section
- ✅ All methods documented: `get`, `set`, `delete`, `clear`
- ✅ Accurate to source (`cache.mjs`) - uses `Map` internally

**Source implementation (cache.mjs):**
```js
export function createCache() {
  const values = new Map()
  return {
    get(key) { return values.get(key) },
    set(key, value) { values.set(key, value); return value },
    delete(key) { return values.delete(key) },
    clear() { values.clear() }
  }
}
```
