

**Work done.**

- **Source read:** `bench-targets/docs/src/cache.mjs`
- **Output file:** `bench-artifacts/cache-api.md`

**Commands run:**

```bash
mkdir -p bench-artifacts
cat > bench-artifacts/cache-api.md << 'EOF'
...
EOF
```

**Verification status:** File created with all required sections (`# Cache API`, `## createCache()`, `## Methods`) and all methods documented (`get`, `set`, `delete`, `clear`).
