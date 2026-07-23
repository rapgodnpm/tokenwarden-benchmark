

**Verification Status: PASSED** - Both tests pass.

---

### Summary of Changes

**File edited:** `bench-targets/next-api/app/api/users/route.mjs`

**Problems fixed:**
1. **Malformed JSON handling** - Added `let body = undefined` declaration and wrapped `request.json()` in try-catch to return HTTP 400 on parse errors
2. **Missing required field validation** - Added check for `body.name` to return HTTP 400 when absent

**Final code:**
```javascript
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'invalid json' }, 400)
  }
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  if (!body.name) return json({ error: 'missing name' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

**Test results:**
- `node --test bench-targets/next-api/route.test.mjs` → **2 passed, 0 failed**
