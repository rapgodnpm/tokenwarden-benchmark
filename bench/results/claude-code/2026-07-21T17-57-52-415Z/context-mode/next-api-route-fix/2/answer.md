

All tests pass. Here's a summary:

## Changes Made

**File:** `bench-targets/next-api/app/api/users/route.mjs`

**Fixes:**
1. Added try/catch around `request.json()` to handle malformed JSON, returning HTTP 400
2. Declared `body` variable outside the try block so it's accessible after catching errors
3. Added validation for the `name` field (missing name returns HTTP 400)

**Final code:**
```javascript
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid JSON' }, 400)
  }
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  if (!body.name) return json({ error: 'name required' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

## Verification Status
- **Command:** `node --test bench-targets/next-api/route.test.mjs`
- **Result:** 2 tests passed, 0 failed
  - `POST rejects malformed JSON and missing fields` ✓
  - `POST accepts valid user payload` ✓
