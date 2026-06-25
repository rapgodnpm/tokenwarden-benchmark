import { chmod, copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { adapterInstallPackages } from "./adapters.mjs"
import { DEFAULT_INSTALL_TIMEOUT_MS, DEFAULT_UTILITY_TIMEOUT_MS } from "./config.mjs"
import { runCommand } from "./process.mjs"

export async function installAdapterDependencies(adapter, workspace, options = {}) {
  const actions = []
  const packages = adapterInstallPackages(adapter, options.repoRoot)
  if (packages.length) {
    actions.push({ type: "npm", packages })
    if (!options.dryRun) {
      if (adapter.localPackage) {
        const build = await runCommand("npm", ["run", "build", "-w", "@tokenwarden/opencode"], { cwd: options.repoRoot, env: options.env, timeoutMs: options.timeoutMs ?? DEFAULT_INSTALL_TIMEOUT_MS, killProcessGroup: true })
        if (build.code !== 0) throw new Error(commandFailureMessage("local TokenWarden build failed", build))
      }
      const result = await runCommand("npm", ["install", "--prefix", workspace.configDir, ...packages], { env: options.env, timeoutMs: options.timeoutMs ?? DEFAULT_INSTALL_TIMEOUT_MS, killProcessGroup: true })
      if (result.code !== 0) throw new Error(commandFailureMessage(`npm install failed for ${adapter.id}`, result))
    }
  }

  for (const binary of adapter.binaries ?? []) {
    actions.push({ type: "binary", name: binary.name, source: binary.source, repo: binary.repo })
    if (!options.dryRun) await installGithubReleaseBinary(binary, workspace, options.env, options.utilityTimeoutMs)
  }
  return actions
}

export async function installProviderDependencies(workspace, packages, options = {}) {
  const uniquePackages = [...new Set(packages ?? [])]
  if (!uniquePackages.length) return []
  const actions = [{ type: "npm", packages: uniquePackages, reason: "provider" }]
  if (!options.dryRun) {
    const result = await runCommand("npm", ["install", "--prefix", workspace.configDir, ...uniquePackages], { env: options.env, timeoutMs: options.timeoutMs ?? DEFAULT_INSTALL_TIMEOUT_MS, killProcessGroup: true })
    if (result.code !== 0) throw new Error(commandFailureMessage("npm install failed for provider dependencies", result))
  }
  return actions
}

async function installGithubReleaseBinary(binary, workspace, env, utilityTimeoutMs = DEFAULT_UTILITY_TIMEOUT_MS) {
  const platformKey = `${process.platform}-${process.arch}`
  const assetName = binary.assetByPlatform?.[platformKey]
  if (!assetName) throw new Error(`${binary.name}: unsupported platform ${platformKey}`)

  const releaseResponse = await fetch(`https://api.github.com/repos/${binary.repo}/releases/latest`, {
    headers: { "user-agent": "tokenwarden-benchmark" }
  })
  if (!releaseResponse.ok) throw new Error(`${binary.name}: failed to fetch latest release from ${binary.repo}`)
  const release = await releaseResponse.json()
  const asset = release.assets?.find((item) => item.name === assetName)
  if (!asset?.browser_download_url) throw new Error(`${binary.name}: release asset ${assetName} not found`)

  await mkdir(workspace.downloads, { recursive: true })
  const archivePath = join(workspace.downloads, assetName)
  const archiveResponse = await fetch(asset.browser_download_url, { headers: { "user-agent": "tokenwarden-benchmark" } })
  if (!archiveResponse.ok) throw new Error(`${binary.name}: failed to download ${assetName}`)
  await writeFile(archivePath, Buffer.from(await archiveResponse.arrayBuffer()))

  if (assetName.endsWith(".tar.gz")) {
    const result = await runCommand("tar", ["-xzf", archivePath, "-C", workspace.downloads], { env, timeoutMs: utilityTimeoutMs })
    if (result.code !== 0) throw new Error(commandFailureMessage(`${binary.name}: tar extraction failed`, result))
    const extractedBinary = await findExtractedBinary(workspace.downloads, binary.name)
    if (!extractedBinary) throw new Error(`${binary.name}: extracted archive did not contain ${binary.name}`)
    await copyFile(extractedBinary, join(workspace.bin, binary.name))
    await chmod(join(workspace.bin, binary.name), 0o755)
  } else {
    throw new Error(`${binary.name}: unsupported archive type ${basename(assetName)}`)
  }
}

function commandFailureMessage(message, result) {
  const status = result.timedOut ? `timed out after ${result.durationMs}ms` : result.signal ? `signal=${result.signal}` : `exit=${result.code}`
  const output = result.stderr || result.stdout
  return [message, status, output].filter(Boolean).join("\n\n")
}

async function findExtractedBinary(root, name) {
  const entries = await readdir(root)
  for (const entry of entries) {
    const path = join(root, entry)
    const info = await stat(path)
    if (info.isFile() && entry === name) return path
    if (info.isDirectory()) {
      const found = await findExtractedBinary(path, name)
      if (found) return found
    }
  }
  return undefined
}
