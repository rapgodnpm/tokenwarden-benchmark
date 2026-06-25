**File modified:** `bench-targets/next-api/app/api/users/route.mjs`

**Changes:**
- Added `.catch()` to `request.json()` to return HTTP 400 for malformed JSON instead of throwing an unhandled error
- Added validation for `body.name` field (must be a string) to return HTTP 400 if missing or invalid

**Test results:** All 2 tests pass (malformed JSON returns 400, missing fields return 400, valid payload returns 201).
