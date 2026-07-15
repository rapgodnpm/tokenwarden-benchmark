# TokenWarden Benchmark

This repo measures how much context-optimization plugins reduce token use in `opencode` without preventing the model from completing real coding tasks.

Each plugin gets the same model, prompt, files, and automated checks. A no-plugin run is the baseline. The reports compare:

- whether the task passed;
- input and output tokens;
- token savings versus the baseline;
- duration, timeouts, and estimated cost.

Token savings only matter when the task still passes.

## Cost warning

**A full run makes 210 model calls and can be expensive.** It runs 14 tasks against 5 plugin configurations, 3 times each.

The latest published run used 18,222,885 input tokens and 353,578 output tokens. At the README's Opus 4.8 pricing assumption of $15/1M input tokens and $75/1M output tokens, that would have cost **$299.86**. Your cost will depend on the model, provider, caching, and selected tasks.

Start with a dry run or one task:

```sh
npm run bench:dry
npm run bench -- --plugins baseline,tokenwarden --tasks react-state-bug-fix --runs 1
```

## How it works

For every task, plugin, and run, the benchmark:

1. Creates a clean workspace from a pinned [Hono](https://github.com/honojs/hono) commit.
2. Adds the task's test fixture when needed.
3. Runs the task through `opencode` with one plugin enabled, or no plugin for the baseline.
4. Runs automated checks and records the answer, changed files, logs, tokens, time, and cost.

The first three tasks use the real Hono source tree. The other tasks add small, deterministic examples to that workspace. See [`future.v1.json`](bench/tasks/future.v1.json) for the exact prompts.

## Benchmark tasks

| Task | What the model has to do |
| --- | --- |
| [`routing-read-write-ledger`](docs/benchmark-tasks/routing-read-write-ledger.md) | Read 24 Hono router files and write one structured summary. No source edits. |
| [`helper-read-write-ledger`](docs/benchmark-tasks/helper-read-write-ledger.md) | Read 23 Hono helper files and write one structured summary. No source edits. |
| [`core-api-read-write-ledger`](docs/benchmark-tasks/core-api-read-write-ledger.md) | Read 18 Hono core API files and write one structured summary. No source edits. |
| [`react-state-bug-fix`](docs/benchmark-tasks/react-state-bug-fix.md) | Stop a cart update from mutating the previous state object. |
| [`next-api-route-fix`](docs/benchmark-tasks/next-api-route-fix.md) | Return `400` for malformed or incomplete JSON while preserving valid `201` responses. |
| [`cli-flag-parsing-fix`](docs/benchmark-tasks/cli-flag-parsing-fix.md) | Make a CLI parser handle flags, values, `--key=value`, and positional arguments. |
| [`large-test-log-debug`](docs/benchmark-tasks/large-test-log-debug.md) | Find one small math bug hidden behind 80 repetitive test failures. |
| [`typecheck-flood-debug`](docs/benchmark-tasks/typecheck-flood-debug.md) | Find one missing schema field behind 60 repeated checker errors. |
| [`build-failure-debug`](docs/benchmark-tasks/build-failure-debug.md) | Repair a mismatched build-config property without changing its meaning. |
| [`multi-file-rename-migration`](docs/benchmark-tasks/multi-file-rename-migration.md) | Rename an exported function across its implementation, export, and references. |
| [`feature-add-small`](docs/benchmark-tasks/feature-add-small.md) | Add title-case formatting while preserving the existing modes. |
| [`refactor-no-behavior-change`](docs/benchmark-tasks/refactor-no-behavior-change.md) | Deduplicate name normalization without changing public behavior. |
| [`code-review-diagnosis`](docs/benchmark-tasks/code-review-diagnosis.md) | Review payment code, report two concrete risks, and make no source edits. |
| [`docs-from-code`](docs/benchmark-tasks/docs-from-code.md) | Read a cache implementation and document its public API accurately. |

A run fails if the model call fails, times out, or does not pass the task's automated checks. Each detail page separates those checks from any additional instructions in the prompt.

## Quick start

You need Node.js, npm, `opencode`, and authentication for the model provider you plan to use.

```sh
npm install
npm test
npm run prepare
npm run bench:dry
```

Run the full benchmark only when you are ready for 210 model calls:

```sh
npm run bench
```

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run prepare` | Builds every workspace without calling a model. |
| `npm run bench:dry` | Checks the runner without calling a model. |
| `npm run bench -- --tasks <ids>` | Runs only the comma-separated task IDs. |
| `npm run bench -- --plugins <ids>` | Runs only the comma-separated plugin configurations. |
| `npm run bench -- --runs 1` | Runs each selected task once instead of three times. |
| `npm run bench -- --model <key>` | Uses a preset from [`bench/models.json`](bench/models.json). |
| `npm run bench:report -- --results <dir> --no-open` | Rebuilds reports for an existing result directory. |

The default plugin configurations are `baseline`, `tokenwarden`, `openslimedit`, `dcp`, and `openrtk`. Their definitions live in [`bench/adapters/`](bench/adapters/).

## Results

Runs are saved under `bench/results/<run-id>/`. [`bench/results/latest.json`](bench/results/latest.json) points to the latest published run.

| File | Use it for |
| --- | --- |
| `report.html` | Reading the benchmark results in a browser. |
| `report.md` | Reading the same report on GitHub. |
| `tokens.csv` | Analyzing every individual run. |
| `averages.csv` | Comparing aggregated task and plugin results. |
| `summary.json` | Processing the complete result data. |
| `<plugin>/<task>/<run>/` | Inspecting the exact prompt, answer, logs, verification, and session. |

The generated reports currently estimate cost at $5/1M input tokens and $25/1M output tokens. The **$299.86** warning above is a separate Opus 4.8 what-if estimate.

## Changing the benchmark

- Task definitions and checks: [`bench/tasks/future.v1.json`](bench/tasks/future.v1.json)
- Seeded task files: [`bench/fixtures/future/create-fixture.mjs`](bench/fixtures/future/create-fixture.mjs)
- Runner: [`bench/run-opencode-benchmark.mjs`](bench/run-opencode-benchmark.mjs)
- Tests: [`bench/tests/`](bench/tests/)

Run `npm test` and a targeted `npm run bench:dry -- --tasks <id> --runs 1` after changing a task or the runner.
