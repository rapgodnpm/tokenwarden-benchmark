# THESE BENCHMARKS CAN BE EXPENSIVE: THE LATEST RUN WOULD HAVE COST $299.86 ON OPUS 4.8

This repository runs real `opencode` benchmark tasks against real models. A full default run is not a toy command: it launches 210 model calls by default, because it runs 14 tasks across 5 adapters with 3 runs per adapter/task pair.

The latest published benchmark in `bench/results/2026-06-23T16-47-14-546Z` used 18,222,885 input tokens and 353,578 output tokens. If that same token volume had been billed at the Opus 4.8 pricing assumption used here, $15 per 1M input tokens and $75 per 1M output tokens, it would have cost **$299.86**.

## Contents

- [What This Repo Is](#what-this-repo-is)
- [Cost Warning](#cost-warning)
- [Quick Start](#quick-start)
- [What `npm run bench` Does](#what-npm-run-bench-does)
- [Future v1 Benchmark Suite](#future-v1-benchmark-suite)
- [Adapters Compared](#adapters-compared)
- [Models And Providers](#models-and-providers)
- [Commands](#commands)
- [CLI Options](#cli-options)
- [Results And Reports](#results-and-reports)
- [Repository Layout](#repository-layout)
- [Development And Tests](#development-and-tests)

## What This Repo Is

`tokenwarden-benchmark` is a reproducible benchmark harness for comparing `opencode` context optimization plugins. It prepares isolated workspaces, runs the same benchmark task prompts through `opencode`, records token usage, verifies task outputs, and writes public result summaries.

The current benchmark suite is `future.v1`. The old 3-task legacy suite has been removed, so the benchmark tasks in this repo are the same tasks that run by default when typing:

```sh
npm run bench
```

The harness compares each plugin configuration against a no-plugin baseline. Published reports focus on token usage, token reduction versus baseline, failures, timeouts, duration, and estimated token cost.

## Cost Warning

Running the default benchmark can be expensive because it executes:

- 14 benchmark tasks.
- 5 adapter configurations.
- 3 runs per task and adapter.
- 210 total `opencode` model calls.

The latest published run is tracked by `bench/results/latest.json` and points to `bench/results/2026-06-23T16-47-14-546Z`.

Latest published token volume:

| Metric | Value |
| --- | ---: |
| Result directory | `bench/results/2026-06-23T16-47-14-546Z` |
| Benchmark rows | 210 |
| Input tokens | 18,222,885 |
| Output tokens | 353,578 |
| Assumed Opus 4.8 input price | $15 / 1M input tokens |
| Assumed Opus 4.8 output price | $75 / 1M output tokens |
| Would-have-cost on Opus 4.8 | **$299.86** |

That amount is not what every run will cost. It is the cost that the latest published benchmark would have incurred if the same input and output token counts had been billed using Opus 4.8 pricing. Actual cost depends on the selected model, provider pricing, model behavior, cache behavior, failures, retries, and any CLI options you pass.

Use `npm run bench:dry` before real runs, and use `--tasks`, `--plugins`, or `--runs 1` when testing changes.

## Quick Start

Install dependencies, run tests, prepare workspaces, and do a dry run first:

```sh
npm install
npm test
npm run prepare
npm run bench:dry
```

Run the full default benchmark only after provider authentication and model selection are ready:

```sh
npm run bench
```

Run a smaller real benchmark while developing:

```sh
npm run bench -- --plugins baseline,tokenwarden --tasks react-state-bug-fix --runs 1
```

Regenerate reports for an existing result directory:

```sh
npm run bench:report -- --results bench/results/2026-06-23T16-47-14-546Z --no-open
```

## What `npm run bench` Does

`npm run bench` executes `node bench/run-opencode-benchmark.mjs`.

The runner:

1. Loads the default suite from `bench/lib/runner-options.mjs`.
2. Loads selected tasks from `bench/tasks/future.v1.json`.
3. Loads selected adapter definitions from `bench/adapters/*.json`.
4. Creates an isolated workspace for each adapter, task, and run.
5. Inherits local `opencode` auth into that workspace.
6. Clones the pinned benchmark repository commit.
7. Applies any deterministic local fixture setup for the task.
8. Writes a generated `opencode` config with exactly the selected adapter plugin enabled.
9. Runs the benchmark prompt through `opencode run` unless `--dry-run` or `--prepare-only` is set.
10. Runs task verification commands.
11. Exports session, stats, logs, changed files, artifacts, and usage summaries.
12. Writes `summary.json` files and updates `bench/results/latest.json`.

By default, the runner uses:

| Setting | Default |
| --- | --- |
| Suite | `future.v1` |
| Runs | `3` |
| Adapters | `baseline,tokenwarden,openslimedit,dcp,openrtk` |
| Model | Default entry in `bench/models.json` |
| AI timeout | `1,800,000ms` |
| Clone timeout | `300,000ms` |
| Install timeout | `600,000ms` |
| Setup timeout | `120,000ms` |
| Verify timeout | `120,000ms` |

Generated benchmark configs are designed for headless execution. Normal in-repo tools are allowed, but interactive or unattended-blocking permissions are denied, including `question`, `task`, and `external_directory`.

## Future v1 Benchmark Suite

`future.v1` is the only benchmark suite in this repo. It is defined in `bench/tasks/future.v1.json`.

Suite metadata:

| Field | Value |
| --- | --- |
| Suite ID | `future.v1` |
| Repository | `https://github.com/honojs/hono.git` |
| Branch | `main` |
| Pinned commit | `27b7992f821bc10c2f62ad0ad86bd94eea251862` |
| Task count | 14 |

The first three tasks are read/write ledger tasks over the pinned Hono source tree. The remaining tasks use deterministic local fixtures generated by `bench/fixtures/future/create-fixture.mjs` inside the cloned workspace.

Tasks:

| Task ID | Purpose |
| --- | --- |
| `routing-read-write-ledger` | Read routing files and write a factual markdown ledger. |
| `helper-read-write-ledger` | Read helper files and write a factual markdown ledger. |
| `core-api-read-write-ledger` | Read core API files and write a factual markdown ledger. |
| `react-state-bug-fix` | Fix a seeded React-style state update bug. |
| `next-api-route-fix` | Fix seeded API route validation and error handling. |
| `cli-flag-parsing-fix` | Fix seeded CLI flag parsing behavior. |
| `large-test-log-debug` | Diagnose a failure with noisy test output. |
| `typecheck-flood-debug` | Find the small root cause behind repeated checker errors. |
| `build-failure-debug` | Fix a seeded build configuration failure. |
| `multi-file-rename-migration` | Migrate a renamed API across files. |
| `feature-add-small` | Add a small feature using existing patterns. |
| `refactor-no-behavior-change` | Refactor duplicated logic without behavior changes. |
| `code-review-diagnosis` | Produce a findings-first code review without editing source files. |
| `docs-from-code` | Write documentation from implementation details. |

Every task has verification commands. A run is marked failed if the model call fails or if verification fails.

## Adapters Compared

Adapters live in `bench/adapters/`. Each adapter enables at most one optimization plugin so the benchmark can isolate plugin behavior.

| Adapter | Meaning |
| --- | --- |
| `baseline` | No optimization plugin enabled. |
| `tokenwarden` | Enables `@tokenwarden/opencode`. |
| `openslimedit` | Enables the OpenSlimEdit adapter package. |
| `dcp` | Enables the DCP adapter package. |
| `openrtk` | Enables the OpenRTK adapter package. |

Use `--plugins` to run only a subset:

```sh
npm run bench -- --plugins baseline,tokenwarden --tasks docs-from-code --runs 1
```

## Models And Providers

Selectable benchmark model presets live in `bench/models.json`.

Current presets:

| Key | Provider model |
| --- | --- |
| `openrouter-glm-5.2` | `openrouter/z-ai/glm-5.2` |
| `openrouter-qwen3.7-max` | `openrouter/qwen/qwen3.7-max` |
| `lmstudio-qwen3.5-9b` | `lmstudio/qwen/qwen3.5-9b` |

The default model is the preset marked with `"default": true`.

Run with a specific model:

```sh
npm run bench -- --model openrouter-glm-5.2
```

The runner reads local `opencode` provider configuration and auth from the normal `opencode` config locations, then copies only the auth needed for the isolated benchmark workspace. For OpenRouter runs, the runner checks that OpenRouter auth is available before starting model calls.

## Commands

Package scripts:

| Command | What it does |
| --- | --- |
| `npm run bench` | Runs the default `future.v1` benchmark suite. |
| `npm run prepare` | Clones repos, installs packages, applies fixtures, and writes configs without model calls. |
| `npm run bench:prepare` | Alias for `npm run prepare`. |
| `npm run bench:dry` | Exercises runner logic without making real model calls. |
| `npm run bench:report` | Rebuilds `report.md`, `report.html`, `tokens.csv`, and `averages.csv` from an existing `summary.json`. |
| `npm test` | Runs harness unit tests in `bench/tests/*.test.mjs`. |

Useful command examples:

```sh
npm run bench -- --tasks react-state-bug-fix
npm run bench -- --plugins baseline,tokenwarden
npm run bench -- --runs 1
npm run bench -- --model openrouter-qwen3.7-max
npm run bench -- --results bench/results/custom-run
npm run bench -- --workspace /tmp/tokenwarden-bench/custom-run
```

## CLI Options

Common runner options:

| Option | Example | Purpose |
| --- | --- | --- |
| `--plugins` | `--plugins baseline,tokenwarden` | Comma-separated adapter IDs. |
| `--tasks` | `--tasks react-state-bug-fix,docs-from-code` | Comma-separated task IDs from `future.v1`. |
| `--runs` | `--runs 1` | Runs per adapter/task pair. |
| `--suite` | `--suite future.v1` | Suite ID. Only `future.v1` exists in this repo. |
| `--model` | `--model openrouter-glm-5.2` | Model preset key or provider/model ID. |
| `--ai-timeout-ms` | `--ai-timeout-ms 1800000` | Timeout for each `opencode run`. |
| `--results` | `--results bench/results/custom-run` | Output result directory. |
| `--workspace` | `--workspace /tmp/tokenwarden-bench/custom-run` | Workspace root for generated clones/configs. |
| `--prepare-only` | `--prepare-only` | Prepare workspaces without model calls. |
| `--dry-run` | `--dry-run` | Skip real benchmark execution for a low-risk runner check. |

## Results And Reports

Results are written under `bench/results/<run-id>/` unless `--results` is passed. The latest result pointer is stored in `bench/results/latest.json`.

Important files:

| File | Meaning |
| --- | --- |
| `summary.json` | Full machine-readable run summaries. |
| `report.md` | Markdown report generated from `summary.json`. |
| `report.html` | HTML report generated from `summary.json`. |
| `tokens.csv` | One row per adapter, task, and run. |
| `averages.csv` | Aggregated task/plugin statistics. |
| `<adapter>/<task>/<run>/summary.json` | Per-run details. |
| `<adapter>/<task>/<run>/prompt.md` | Exact prompt sent to `opencode`. |
| `<adapter>/<task>/<run>/answer.md` | Final model answer, when available. |
| `<adapter>/<task>/<run>/verify.log` | Verification output. |
| `<adapter>/<task>/<run>/session.export.json` | Exported `opencode` session, when available. |

`tokens.csv` includes one row per adapter, task, and run:

```text
plugin,task,run,dry_run,prepare_only,failed,timed_out,duration_ms,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,total_tokens,provider_estimated_cost_usd,input_cost_usd,output_cost_usd,calculated_cost_usd,saved_vs_baseline,saved_percent,saved_cost_vs_baseline,saved_cost_percent
```

`averages.csv` includes task-level aggregates:

```text
task,plugin,runs,failed_runs,timeout_count,median_duration_ms,average_input_tokens,average_output_tokens,average_cache_read_tokens,average_cache_write_tokens,median_total_tokens,average_total_tokens,p25_total_tokens,p75_total_tokens,min_total_tokens,max_total_tokens,average_provider_estimated_cost_usd,average_input_cost_usd,average_output_cost_usd,median_calculated_cost_usd,average_calculated_cost_usd,p25_calculated_cost_usd,p75_calculated_cost_usd,min_calculated_cost_usd,max_calculated_cost_usd,median_saved_vs_baseline,average_saved_vs_baseline,median_saved_percent,average_saved_percent,median_saved_cost_vs_baseline,average_saved_cost_vs_baseline,median_saved_cost_percent,average_saved_cost_percent
```

The built-in report cost columns currently use the constants in `bench/lib/reporting.mjs`: `$5/1M` input tokens and `$25/1M` output tokens. The Opus 4.8 warning at the top of this README is a separate what-if calculation using `$15/1M` input and `$75/1M` output for the latest published run.

## Repository Layout

```text
bench/
  adapters/                  Adapter definitions for baseline and plugins.
  fixtures/future/           Deterministic fixture generator for future.v1 tasks.
  lib/                       Runner, reporting, workspace, install, config, and opencode helpers.
  models.json                Selectable benchmark model presets.
  report.mjs                 Rebuilds reports from an existing result summary.
  results/                   Published and local benchmark result directories.
  run-opencode-benchmark.mjs Main benchmark runner used by npm run bench.
  tasks/future.v1.json       Default and only benchmark task suite.
  tests/                     Node test runner coverage for harness utilities.
```

## Development And Tests

Run the harness tests before changing benchmark logic:

```sh
npm test
```

Use dry runs while editing runner code:

```sh
npm run bench:dry
```

Use prepare-only runs to validate clone, install, config, and fixture setup without spending model tokens:

```sh
npm run prepare
```

When adding or changing a benchmark task:

- Add it to `bench/tasks/future.v1.json`.
- Add deterministic fixture setup to `bench/fixtures/future/create-fixture.mjs` if the task needs seeded files.
- Include verification commands that fail when the intended task was not completed.
- Add or update tests in `bench/tests/` when runner behavior changes.
- Run `npm test` and at least one targeted `npm run bench:dry` command.
