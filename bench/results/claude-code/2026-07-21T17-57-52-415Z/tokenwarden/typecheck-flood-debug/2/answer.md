

Fix verified. Here's the summary:

## Root Cause
`typecheck.mjs` looped 60 times (lines 6-8) printing the same error message 60 times, creating noisy repeated errors.

## Fix Applied
**File:** `bench-targets/typecheck-flood/typecheck.mjs`

Removed the unnecessary `for` loop that repeated the error. Changed from:
```javascript
for (let index = 0; index < 60; index += 1) {
  console.error(`type error ${index}: UserRow is missing required fields: ${missing.join(', ')}`)
}
```
To:
```javascript
console.error(`type error: UserRow is missing required fields: ${missing.join(', ')}`)
```

## Verification Status
✅ **Fixed** - Now outputs a single error message instead of 60 repeated errors. The script still exits with code 1 as expected since `email` is indeed missing from `userFields`.
