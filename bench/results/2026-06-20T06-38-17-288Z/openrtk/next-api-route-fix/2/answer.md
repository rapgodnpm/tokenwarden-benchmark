Fixed validation in `bench-targets/next-api/app/api/users/route.mjs`: added try-catch for malformed JSON (returning HTTP 400) and validation for required `name` field. All 2 tests pass.
