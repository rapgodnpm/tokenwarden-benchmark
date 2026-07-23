

Migrate complete.

Files edited:
- `/bench-targets/rename/src/format-user.mjs` — renamed `oldFormatUser` to `formatUserLabel`
- `/bench-targets/rename/src/index.mjs` — updated export to `formatUserLabel`

Verification:
- `node --test bench-targets/rename/format-user.test.mjs` — 1 pass, 0 fail
- `grep -R oldFormatUser bench-targets/rename/src` — no matches
