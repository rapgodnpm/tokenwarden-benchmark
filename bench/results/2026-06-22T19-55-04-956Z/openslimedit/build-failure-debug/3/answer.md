**Fix applied** - Property mismatch in config.mjs (`entries` → `entryPoints`) to match the build validator's expected property name.

**Command run**: `node bench-targets/build-failure/build.mjs`  
**Verification status**: ✅ Passed (output: "build ok")
