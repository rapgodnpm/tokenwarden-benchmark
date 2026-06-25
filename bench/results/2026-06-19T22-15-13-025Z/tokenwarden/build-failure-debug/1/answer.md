I see the issue: `config.mjs` exports `entries` but `build.mjs` checks for `entryPoints`. I'll fix the config file:







Build verified successfully. Configuration key renamed `entries` → `entryPoints` to match build.mjs validation.
