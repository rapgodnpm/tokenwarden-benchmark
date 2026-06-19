export function parseArgs(argv) {
  const result = { _: [] }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg.startsWith("--")) {
      result._.push(arg)
      continue
    }

    const [rawKey, inlineValue] = arg.slice(2).split(/=(.*)/s, 2)
    const key = rawKey.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    if (inlineValue !== undefined) {
      result[key] = inlineValue
    } else if (argv[index + 1] && !argv[index + 1].startsWith("--")) {
      result[key] = argv[index + 1]
      index += 1
    } else {
      result[key] = true
    }
  }
  return result
}

export function csv(value, fallback = []) {
  if (value === undefined || value === true || value === false || value === "") return fallback
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function intArg(value, fallback) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}
