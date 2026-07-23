

File: `/work/caveman-next-api-route-fix-2/repo/bench-targets/next-api/app/api/users/route.mjs`

Changes:
- Wrapped `request.json()` in try-catch to return 400 on parse errors
- Declared `body` outside try-catch for scope access
- Added validation for `body.name` field

Command: `node --test bench-targets/next-api/route.test.mjs`

Verification: 2/2 tests pass
