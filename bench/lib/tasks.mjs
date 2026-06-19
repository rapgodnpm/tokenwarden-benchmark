import { readFile } from "node:fs/promises"

export const TASKS_DIR = new URL("../tasks/", import.meta.url)

export async function loadSuite(suiteID) {
  const suite = JSON.parse(await readFile(new URL(`${suiteID}.json`, TASKS_DIR), "utf8"))
  if (!Array.isArray(suite.tasks) || suite.tasks.length === 0) throw new Error(`${suiteID}: suite has no tasks`)
  return suite
}

export function selectTasks(suite, taskIDs = []) {
  if (taskIDs.length === 0) return suite.tasks
  const selected = suite.tasks.filter((task) => taskIDs.includes(task.id))
  const missing = taskIDs.filter((id) => !selected.some((task) => task.id === id))
  if (missing.length) throw new Error(`unknown task IDs for ${suite.id}: ${missing.join(", ")}`)
  return selected
}

export function renderPrompt(task, context = {}) {
  return [
    `Benchmark task: ${task.id}`,
    `Repository: ${context.repo ?? "unknown"}`,
    "",
    task.prompt,
    "",
    "Constraints:",
    "- Do not ask the user to write prompts or inspect files manually.",
    "- Prefer the smallest safe code change when edits are required.",
    "- Include exact file paths, commands run, and verification status in the final answer."
  ].join("\n")
}
