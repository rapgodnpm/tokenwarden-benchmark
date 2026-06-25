Documentation written successfully.

**File created**: `/bench-artifacts/cache-api.md`

**Verification**:
- **Source code unchanged**: cache.mjs is untracked (original file preserved)
- **Documentation includes all required elements**: 
  - `# Cache API` header
  - `## createCache()` section
  - `## Methods` section  
  - Mentions `get`, `set`, `delete`, and `clear` operations
  - Accurate method descriptions based on implementation

**Commands run**:
```bash
mkdir -p bench-artifacts
cat bench-targets/docs/src/cache.mjs  # Read source
write bench-artifacts/cache-api.md  # Write docs
git status bench-targets/docs/src/cache.mjs  # Verify no source changes
```
