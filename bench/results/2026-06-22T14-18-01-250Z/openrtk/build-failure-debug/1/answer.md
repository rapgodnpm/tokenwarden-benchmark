The issue is a property name mismatch:
- [config.mjs](file:///private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openrtk-build-failure-debug-1/repo/node_modules/ollama) exports `entries` (line 2)
- [build.mjs](file:///private/tmp/tokenwarden-bench/2026-06-22T14-18-01-250Z/openrtk-build-failure-debug-1/repo/node_modules/@azure/openai) checks for `entryPoints` (line 3)







Fixed. Changed `entries` to `entryPoints` in config.mjs. Build now succeeds with `build ok`.
