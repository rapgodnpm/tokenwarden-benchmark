

Both tests pass. Here's a summary of the fix:

## Changes Made

**File:** `bench-targets/next-api/app/api/users/route.mjs`

**Issues Fixed:**
1. **Malformed JSON handling**: Added try-catch around `request.json()` to catch JSON parsing errors and return HTTP 400
2. **Missing `name` field validation**: Added check for `body.name` - the test expects both `email` and `name` to be required
3. **Scope issue**: Declared `body` with `let` before the try block to prevent ReferenceError (body was block-scoped inside the try)

**Final code:**
```javascript
function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid json' }, 400)
  }
  if (!body.email || !body.email.includes('@') || !body.name) {
    return json({ error: 'invalid payload' }, 400)
  }
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

## Verification Status
- **Command run:** `node --test bench-targets/next-api/route.test.mjs`
- **Result:** ✅ Both tests pass
  - `POST rejects malformed JSON and missing fields` - PASS
  - `POST accepts valid user payload` - PASS
