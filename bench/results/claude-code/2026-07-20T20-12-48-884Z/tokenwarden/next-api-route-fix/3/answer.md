

## Summary

**Files modified:**
- `bench-targets/next-api/app/api/users/route.mjs`

**Changes made:**
1. Wrapped `await request.json()` in a try-catch to handle malformed JSON and return HTTP 400
2. Added validation for the missing `name` field, returning HTTP 400 if absent

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
    return json({ error: 'malformed JSON' }, 400)
  }
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  if (!body.name) return json({ error: 'missing name' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

**Verification:**
```
$ node --test bench-targets/next-api/route.test.mjs
ok 1 - POST rejects malformed JSON and missing fields
ok 2 - POST accepts valid user payload
# tests 2
# pass 2
```
