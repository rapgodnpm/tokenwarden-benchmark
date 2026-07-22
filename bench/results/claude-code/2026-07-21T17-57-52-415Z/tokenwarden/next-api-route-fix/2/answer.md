

All tests pass. Here's a summary:

## Changes Made

**File:** `bench-targets/next-api/app/api/users/route.mjs`

**Issues Fixed:**
1. **Malformed JSON handling**: Wrapped `request.json()` in a try-catch block to return HTTP 400 for invalid JSON instead of throwing an uncaught error
2. **Missing required fields validation**: Added validation for `body.name` alongside the existing email validation

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
    return json({ error: 'invalid JSON' }, 400)
  }
  if (!body.email || !body.email.includes('@') || !body.name) {
    return json({ error: 'invalid email' }, 400)
  }
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

## Verification Status
- Command: `node --test bench-targets/next-api/route.test.mjs`
- Result: **2/2 tests passed**
  - ✓ POST rejects malformed JSON and missing fields
  - ✓ POST accepts valid user payload
