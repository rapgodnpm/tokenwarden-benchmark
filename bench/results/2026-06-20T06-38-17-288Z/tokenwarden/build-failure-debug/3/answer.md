The issue is a key mismatch: `config.mjs` uses `entries` but `build.mjs` expects `entryPoints`.







Fix applied. Changed `entries` to `entryPoints` in `src/config.mjs`. Build verification passed (exit code 0, output: "build ok").
