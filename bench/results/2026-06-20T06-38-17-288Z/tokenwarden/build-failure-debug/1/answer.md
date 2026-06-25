The issue is clear: `config.mjs` uses `entries` while `build.mjs` expects `entryPoints`:







**Fixed** `bench-targets/build-failure/src/config.mjs`:

Changed `entries` to `entryPoints` (one word) to match what `build.mjs` expects. Entry path and output directory semantics preserved.

```
node bench-targets/build-failure/build.mjs
build ok
```
