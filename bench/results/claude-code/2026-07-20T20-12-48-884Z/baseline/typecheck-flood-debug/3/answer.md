

Fixed. Here's the summary:

| Item | Details |
|------|---------|
| **Root cause** | Loop in `typecheck.mjs` printed the same error 60 times (line 6-8) |
| **Fix** | Removed the loop; print error once |
| **File changed** | `bench-targets/typecheck-flood/typecheck.mjs` |

**Verification status**: ✅
- Before: 60 identical repeated error messages  
- After: Single error message  
- Exit code: Still `1` (correct failure behavior preserved)
