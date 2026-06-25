The issue is a property name mismatch: `config.mjs` exports `entries` but `build.mjs` expects `entryPoints`. I'll fix `config.mjs` to use the correct property name:







Fixed config.mjs by changing `entries` to `entryPoints`. Verification: **build ok**.
