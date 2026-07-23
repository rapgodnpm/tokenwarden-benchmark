

All tests pass. Here's the summary:

## Fix Summary

**File edited:** `/work/tokenwarden-next-api-route-fix-1/repo/bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Wrapped `request.json()` in a try-catch block to handle malformed JSON and return HTTP 400
2. Added validation for the `name` field alongside the existing email validation

**Before:**
```javascript
export async function POST(request) {
  const body = await request.json()
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

**After:**
```javascript
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'malformed json' }, 400)
  }

  if (!body.email || !body.email.includes('@') || !body.name) {
    return json({ error: 'invalid email' }, 400)
  }

  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

## Verification Status
- Command: `node --test bench-targets/next-api/route.test.mjs`
- Result: **2 tests passed, 0 failed**
  - POST rejects malformed JSON and missing fields ✓
  - POST accepts valid user payload ✓
