I can see the mismatch: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. Let me run the build to confirm, then fix it.




The build fails due to property name mismatch. I'll fix `config.mjs` by changing `entries` to `entryPoints`:










Fixed. Changed `entries` to `entryPoints` in `config.mjs` to match the property expected by `build.mjs`. Build now passes.
