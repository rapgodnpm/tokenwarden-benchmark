# TokenWarden Benchmark

This repo measures how much optimization plugins reduce token use in OpenCode and Claude Code without preventing the model from completing real coding tasks.

Each plugin gets the same model, prompt, files, and automated checks. A no-plugin run is the baseline. The reports compare:

- whether the task passed;
- input and output tokens;
- token savings versus the baseline;
- duration, timeouts, and estimated cost.

Token savings only matter when the task still passes.

## Cost warning

**A full run on one platform makes 210 model calls and can be expensive.** It runs 14 tasks against 5 plugin configurations, 3 times each. Running both platforms makes 420 model calls.

The latest published run used 18,222,885 input tokens and 353,578 output tokens. At the README's Opus 4.8 pricing assumption of $15/1M input tokens and $75/1M output tokens, that would have cost **$299.86**. Your cost will depend on the model, provider, caching, and selected tasks.

Start with a dry run or one task:

```sh
npm run bench:opencode:dry
npm run bench:claude-code:dry
npm run bench:opencode -- --plugins baseline,tokenwarden --tasks react-state-bug-fix --runs 1
```

## How it works

For every task, plugin, and run, the benchmark:

1. Creates a clean workspace from a pinned [Hono](https://github.com/honojs/hono) commit.
2. Adds the task's test fixture when needed.
3. Runs the task through OpenCode or Claude Code with one plugin enabled, or no plugin for the baseline.
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

You need Node.js, npm, Docker Desktop, and LM Studio with `qwen/qwen3.5-9b` loaded. Every public test, benchmark, and report command runs in Docker. The image pins Node.js, OpenCode, and Claude Code, so host CLI installations and user configuration do not affect results.

```sh
npm install
npm test
npm run bench:opencode:prepare
npm run bench:opencode:dry
npm run bench:claude-code:prepare
npm run bench:claude-code:dry
```

`npm test` recursively discovers current and future Node test files inside the container. Do not invoke `node --test` or the files under `bench/` directly; the entry points reject host execution.

Docker receives the repository read-only. Each benchmark uses a disposable workspace volume and a fresh host staging directory that masks existing results. After the container exits, validated artifacts are moved into `bench/results/`, where they remain normal host files that can be reviewed and committed.

Both platforms use local LM Studio by default. Start LM Studio's server on port 1234 and allow connections from Docker Desktop. Model-running containers use an internal network with access only to a fixed LM Studio proxy; they receive no OpenRouter, Anthropic, SSH, home-directory, or Docker credentials.

Docker runs accept only the `lmstudio-qwen3.5-9b` preset and its model-ID aliases. Cloud presets remain in the model catalog for historical result compatibility but are rejected by the Docker launcher.

Run a full benchmark only when you are ready for 210 model calls:

```sh
npm run bench:opencode
npm run bench:claude-code
```

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run bench:opencode:prepare` | Builds every disposable OpenCode workspace without calling a model. |
| `npm run bench:claude-code:prepare` | Builds every disposable Claude Code workspace without calling a model. |
| `npm run bench:opencode:dry` | Checks the OpenCode runner without cloning or calling a model. |
| `npm run bench:claude-code:dry` | Checks the Claude Code runner without cloning or calling a model. |
| `npm run bench:<platform> -- --tasks <ids>` | Runs only the comma-separated task IDs. |
| `npm run bench:<platform> -- --plugins <ids>` | Runs only the comma-separated plugin configurations. |
| `npm run bench:<platform> -- --runs 1` | Runs each selected task once instead of three times. |
| `npm run bench:<platform> -- --model <key>` | Uses a platform-compatible preset from [`bench/models.json`](bench/models.json). |
| `npm run bench:report:<platform> -- --results <dir> --no-open` | Rebuilds reports for an existing result directory. |

OpenCode defaults to `baseline`, `tokenwarden`, `openslimedit`, `dcp`, and `openrtk`. Claude Code defaults to `baseline`, `tokenwarden`, `context-mode`, `rtk`, and `caveman`. Their definitions live in the platform folders under [`bench/adapters/`](bench/adapters/). Real runs automatically perform an internet-enabled preparation phase, then reuse that volume for model execution on the internal LM Studio-only network.

Each Claude Code configuration runs independently. Caveman shortens final responses; it does not reduce input context and can add input-token overhead.

## Results

Runs are saved under `bench/results/<platform>/<run-id>/`. `bench/results/latest-opencode.json` and `bench/results/latest-claude-code.json` point to the latest run for each platform.

| File | Use it for |
| --- | --- |
| `report.html` | Reading the benchmark results in a browser. |
| `report.md` | Reading the same report on GitHub. |
| `tokens.csv` | Analyzing every individual run. |
| `averages.csv` | Comparing aggregated task and plugin results. |
| `summary.json` | Processing the complete result data. |
| `<plugin>/<task>/<run>/` | Inspecting the exact prompt, answer, logs, verification, and platform metadata. |

The generated reports currently estimate cost at $5/1M input tokens and $25/1M output tokens. The **$299.86** warning above is a separate Opus 4.8 what-if estimate.

## Changing the benchmark

- Task definitions and checks: [`bench/tasks/future.v1.json`](bench/tasks/future.v1.json)
- Seeded task files: [`bench/fixtures/future/create-fixture.mjs`](bench/fixtures/future/create-fixture.mjs)
- OpenCode runner: [`bench/run-opencode-benchmark.mjs`](bench/run-opencode-benchmark.mjs)
- Claude Code runner: [`bench/run-claude-code-benchmark.mjs`](bench/run-claude-code-benchmark.mjs)
- Tests: [`bench/tests/`](bench/tests/)

Run `npm test` and targeted dry runs for both platforms after changing a task or shared runner code.
