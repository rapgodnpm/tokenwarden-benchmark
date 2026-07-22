

All tests pass. Here's the summary:

## Fix Summary

**File**: `bench-targets/next-api/app/api/users/route.mjs`

**Changes made**:
1. **Added try-catch wrapper** around `request.json()` to handle malformed JSON → returns HTTP 400
2. **Added `name` field validation** alongside the existing email validation → returns HTTP 400 if missing

**Before**:
```javascript
export async function POST(request) {
  const body = await request.json()
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
```

**After**:
```javascript
export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.email || !body.email.includes('@') || !body.name) {
      return json({ error: 'invalid email' }, 400)
    }
    return json({ id: 'user_1', email: body.email, name: body.name }, 201)
  } catch {
    return json({ error: 'invalid json' }, 400)
  }
}
```

**Test Results**:
- `POST rejects malformed JSON and missing fields`: ✅ PASS
- `POST accepts valid user payload`: ✅ PASS
