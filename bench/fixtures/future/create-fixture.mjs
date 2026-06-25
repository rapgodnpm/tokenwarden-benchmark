#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"

const taskID = process.argv[2]
if (!taskID) throw new Error("usage: node create-fixture.mjs <task-id>")

const root = process.cwd()

const fixtures = {
  "react-state-bug-fix": {
    "bench-targets/react-state/src/useCartState.mjs": `export function createCartState() {
  return { items: [], total: 0 }
}

export function addItem(state, item) {
  const next = state
  next.items.push(item)
  next.total = state.items.length
  return next
}
`,
    "bench-targets/react-state/src/CartPanel.jsx": `import { addItem } from './useCartState.mjs'

export function CartPanel({ state, item }) {
  const next = addItem(state, item)
  return String(next.total)
}
`,
    "bench-targets/react-state/useCartState.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, createCartState } from './src/useCartState.mjs'

test('addItem returns a new state object without mutating previous state', () => {
  const state = createCartState()
  const next = addItem(state, { id: 'a', label: 'Alpha' })
  assert.notEqual(next, state)
  assert.deepEqual(state.items, [])
  assert.equal(state.total, 0)
  assert.deepEqual(next.items, [{ id: 'a', label: 'Alpha' }])
  assert.equal(next.total, 1)
})
`
  },
  "next-api-route-fix": {
    "bench-targets/next-api/app/api/users/route.mjs": `function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

export async function POST(request) {
  const body = await request.json()
  if (!body.email || !body.email.includes('@')) return json({ error: 'invalid email' }, 400)
  return json({ id: 'user_1', email: body.email, name: body.name }, 201)
}
`,
    "bench-targets/next-api/route.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { POST } from './app/api/users/route.mjs'

test('POST rejects malformed JSON and missing fields', async () => {
  assert.equal((await POST(new Request('http://local/api/users', { method: 'POST', body: '{' }))).status, 400)
  assert.equal((await POST(new Request('http://local/api/users', { method: 'POST', body: JSON.stringify({ email: 'a@example.com' }) }))).status, 400)
})

test('POST accepts valid user payload', async () => {
  const response = await POST(new Request('http://local/api/users', { method: 'POST', body: JSON.stringify({ email: 'a@example.com', name: 'Ada' }) }))
  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), { id: 'user_1', email: 'a@example.com', name: 'Ada' })
})
`
  },
  "cli-flag-parsing-fix": {
    "bench-targets/cli-flags/src/parseArgs.mjs": `export function parseArgs(argv) {
  const result = { _: [] }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg.startsWith('--')) result._.push(arg)
    else result[arg.slice(2)] = true
  }
  return result
}
`,
    "bench-targets/cli-flags/parseArgs.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { parseArgs } from './src/parseArgs.mjs'

test('parseArgs handles booleans, values, equals syntax, and positionals', () => {
  assert.deepEqual(parseArgs(['--verbose', '--count', '3', '--output=dist', 'src/index.js']), {
    _: ['src/index.js'],
    verbose: true,
    count: '3',
    output: 'dist'
  })
})
`
  },
  "large-test-log-debug": {
    "bench-targets/large-log/src/math.mjs": `export function add(a, b) {
  return a - b
}
`,
    "bench-targets/large-log/math.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { add } from './src/math.mjs'

for (let index = 0; index < 80; index += 1) {
  test(\`add case \${index}\`, () => {
    assert.equal(add(index, 2), index + 2)
  })
}
`
  },
  "typecheck-flood-debug": {
    "bench-targets/typecheck-flood/src/schema.mjs": `export const userFields = ['id', 'name']
`,
    "bench-targets/typecheck-flood/typecheck.mjs": `import { userFields } from './src/schema.mjs'

const required = ['id', 'name', 'email']
const missing = required.filter((field) => !userFields.includes(field))
if (missing.length) {
  for (let index = 0; index < 60; index += 1) {
    console.error(\`type error \${index}: UserRow is missing required fields: \${missing.join(', ')}\`)
  }
  process.exit(1)
}
`
  },
  "build-failure-debug": {
    "bench-targets/build-failure/src/config.mjs": `export default {
  entries: ['src/index.js'],
  outDir: 'dist'
}
`,
    "bench-targets/build-failure/build.mjs": `import config from './src/config.mjs'

if (!Array.isArray(config.entryPoints)) throw new Error('build config entryPoints must be an array')
if (config.entryPoints[0] !== 'src/index.js') throw new Error('unexpected entry point')
if (config.outDir !== 'dist') throw new Error('unexpected output directory')
console.log('build ok')
`
  },
  "multi-file-rename-migration": {
    "bench-targets/rename/src/format-user.mjs": `export function oldFormatUser(user) {
  return user.name + ' <' + user.email + '>'
}
`,
    "bench-targets/rename/src/index.mjs": `export { oldFormatUser } from './format-user.mjs'
`,
    "bench-targets/rename/format-user.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { formatUserLabel } from './src/index.mjs'

test('formatUserLabel formats a display label', () => {
  assert.equal(formatUserLabel({ name: 'Ada', email: 'ada@example.com' }), 'Ada <ada@example.com>')
})
`
  },
  "feature-add-small": {
    "bench-targets/feature/src/formatTitle.mjs": `export function formatTitle(value, mode = 'plain') {
  if (mode === 'upper') return value.toUpperCase()
  if (mode === 'lower') return value.toLowerCase()
  return value
}
`,
    "bench-targets/feature/formatTitle.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { formatTitle } from './src/formatTitle.mjs'

test('formatTitle supports title case mode', () => {
  assert.equal(formatTitle('hello benchmark world', 'title'), 'Hello Benchmark World')
  assert.equal(formatTitle('LOUD', 'lower'), 'loud')
})
`
  },
  "refactor-no-behavior-change": {
    "bench-targets/refactor/src/name-formatters.mjs": `export function formatFirstName(value) {
  return value.trim().replace(/\\s+/g, ' ')
}

export function formatLastName(value) {
  return value.trim().replace(/\\s+/g, ' ')
}
`,
    "bench-targets/refactor/name-formatters.test.mjs": `import test from 'node:test'
import assert from 'node:assert/strict'
import { formatFirstName, formatLastName } from './src/name-formatters.mjs'

test('name formatters preserve behavior', () => {
  assert.equal(formatFirstName('  Ada   Lovelace  '), 'Ada Lovelace')
  assert.equal(formatLastName('  van   Rossum  '), 'van Rossum')
})
`
  },
  "code-review-diagnosis": {
    "bench-targets/review/src/payment.mjs": `export function chargeCustomer(customer, amount, gateway) {
  if (!customer.id) return { ok: false, error: 'missing customer' }
  gateway.charge(customer.id, amount)
  return { ok: true }
}

export function refundCustomer(customer, amount, gateway) {
  gateway.refund(customer.id, amount)
  return { ok: true }
}
`
  },
  "docs-from-code": {
    "bench-targets/docs/src/cache.mjs": `export function createCache() {
  const values = new Map()
  return {
    get(key) { return values.get(key) },
    set(key, value) { values.set(key, value); return value },
    delete(key) { return values.delete(key) },
    clear() { values.clear() }
  }
}
`
  }
}

const selected = fixtures[taskID]
if (!selected) throw new Error(`unknown future fixture task: ${taskID}`)

for (const [path, contents] of Object.entries(selected)) {
  const absolutePath = join(root, path)
  await mkdir(dirname(absolutePath), { recursive: true })
  await writeFile(absolutePath, contents, "utf8")
}
