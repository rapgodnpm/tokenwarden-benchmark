**Fix Applied**

The config.mjs file had `entries` as the property name, but build.mjs expected `entryPoints`. Changed it to match.

**Verification**
```
node bench-targets/build-failure/build.mjs
→ build ok
```
