import { cp, lstat, mkdir, open, readdir, readFile, rename, rm } from "node:fs/promises"
import { dirname, join, relative, sep } from "node:path"

export async function persistDockerResults(options) {
  const { stage, destination, repoRoot, id, platform, output = process.stdout, errorOutput = process.stderr } = options
  if (!platform || !["opencode", "claude-code"].includes(platform)) throw new Error(`invalid results platform: ${platform}`)
  const entries = await readdir(stage)
  if (!entries.length) return []
  await assertSafeTree(stage)
  await assertSafeDestinationPath(repoRoot, dirname(destination))
  await mkdir(destination, { recursive: true })
  await assertSafeDestinationPath(repoRoot, destination)

  const latestFiles = entries.filter((entry) => /^latest-(opencode|claude-code)\.json$/.test(entry))
  const expectedLatest = `latest-${platform}.json`
  if (latestFiles.some((entry) => entry !== expectedLatest)) {
    throw new Error(`staged results contain an unexpected platform pointer: ${latestFiles.join(", ")}`)
  }
  if (!latestFiles.length) {
    const failed = join(destination, "failed", id)
    await mkdir(dirname(failed), { recursive: true })
    await rename(stage, failed)
    errorOutput.write(`incomplete container results preserved at ${relative(repoRoot, failed)}\n`)
    return [failed]
  }

  const persisted = []
  for (const latestFile of latestFiles) {
    const latest = JSON.parse(await readFile(join(stage, latestFile), "utf8"))
    const prefix = `bench${sep}results${sep}`
    const normalized = String(latest.resultsRoot).split("/").join(sep)
    if (!normalized.startsWith(prefix)) throw new Error(`unsafe staged results path: ${latest.resultsRoot}`)
    const relativeResults = normalized.slice(prefix.length)
    if (!relativeResults || relativeResults.split(sep).includes("..")) throw new Error(`unsafe staged results path: ${latest.resultsRoot}`)
    if (latest.platform !== platform || !latest.runID || relativeResults !== join(platform, String(latest.runID))) {
      throw new Error(`staged results do not match the expected ${platform} run`)
    }
    const source = join(stage, relativeResults)
    const target = join(destination, relativeResults)
    await assertSafeDestinationPath(destination, dirname(target))
    if (await pathExists(target)) throw new Error(`refusing to overwrite benchmark results: ${target}`)
    await mkdir(dirname(target), { recursive: true })
    await moveTree(source, target)
    try {
      await publishLatestPointer(destination, latestFile, latest, id)
    } catch (error) {
      await moveTree(target, source).catch(() => {})
      throw error
    }
    output.write(`host results: ${relative(repoRoot, target)}\n`)
    persisted.push(target)
  }
  return persisted
}

export async function assertSafeTree(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name)
    const stats = await lstat(child)
    if (stats.isSymbolicLink()) throw new Error(`staged results contain a symbolic link: ${child}`)
    if (stats.isDirectory()) await assertSafeTree(child)
    else if (!stats.isFile()) throw new Error(`staged results contain a non-regular file: ${child}`)
  }
}

export async function preserveFailedDockerResults(options) {
  const { stage, destination, repoRoot, id, errorOutput = process.stderr } = options
  if (!await pathExists(stage) || !(await readdir(stage)).length) return
  await assertSafeTree(stage)
  const failed = join(destination, "failed", id)
  await assertSafeDestinationPath(repoRoot, destination)
  await assertSafeDestinationPath(destination, dirname(failed))
  if (await pathExists(failed)) throw new Error(`failed-results destination already exists: ${failed}`)
  await mkdir(dirname(failed), { recursive: true })
  await rename(stage, failed)
  errorOutput.write(`unpromoted container results preserved at ${relative(repoRoot, failed)}\n`)
}

async function publishLatestPointer(destination, latestFile, latest, id) {
  const latestPath = join(destination, latestFile)
  if (await pathExists(latestPath)) {
    const stats = await lstat(latestPath)
    if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`latest results pointer is not a regular file: ${latestPath}`)
  }
  const safeID = String(id).replace(/[^a-zA-Z0-9_.-]/g, "-")
  const temporaryPath = join(destination, `.${latestFile}.${safeID}.tmp`)
  const handle = await open(temporaryPath, "wx", 0o600)
  try {
    await handle.writeFile(`${JSON.stringify(latest, null, 2)}\n`, "utf8")
    await handle.sync()
  } finally {
    await handle.close()
  }
  try {
    await rename(temporaryPath, latestPath)
  } catch (error) {
    await rm(temporaryPath, { force: true })
    throw error
  }
}

async function moveTree(source, target) {
  await rename(source, target).catch(async (error) => {
    if (error?.code !== "EXDEV") throw error
    await cp(source, target, { recursive: true, errorOnExist: true })
    await rm(source, { recursive: true, force: true })
  })
}

async function assertSafeDestinationPath(root, target) {
  const relativePath = relative(root, target)
  if (relativePath.startsWith("..") || relativePath.split(/[\\/]/).includes("..")) {
    throw new Error(`destination escapes its allowed root: ${target}`)
  }
  let current = root
  for (const segment of relativePath.split(/[\\/]/).filter(Boolean)) {
    current = join(current, segment)
    try {
      const stats = await lstat(current)
      if (stats.isSymbolicLink()) throw new Error(`destination path contains a symbolic link: ${current}`)
      if (!stats.isDirectory()) throw new Error(`destination path component is not a directory: ${current}`)
    } catch (error) {
      if (error?.code === "ENOENT") return
      throw error
    }
  }
}

async function pathExists(path) {
  try {
    await lstat(path)
    return true
  } catch (error) {
    if (error?.code === "ENOENT") return false
    throw error
  }
}
