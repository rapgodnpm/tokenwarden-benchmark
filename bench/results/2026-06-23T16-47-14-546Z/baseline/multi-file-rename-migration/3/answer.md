Migration complete.

**Files modified:**
- `bench-targets/rename/src/index.mjs` - Export renamed from `oldFormatUser` to `formatUserLabel`
- `bench-targets/rename/src/format-user.mjs` - Function renamed from `oldFormatUser` to `formatUserLabel`

**Commands run:**
```bash
node --test bench-targets/rename/format-user.test.mjs
grep -R oldFormatUser bench-targets/rename/src
```

**Verification status:**
| Check | Status |
|-------|--------|
| Test passes | ✅ (1/1 pass, 0 fail) |
| No `oldFormatUser` in src | ✅ (grep found no matches) |

Behavior unchanged - implementation is identical, only the exported interface name was updated.
