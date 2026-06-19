# TokenWarden Benchmark

This repository contains the opencode benchmark harness used for TokenWarden result snapshots.

## Published Results

Two sanitized result snapshots are included under `bench/results/`:

- `2026-06-18T21-21-13-949Z`: latest multi-run snapshot with `report.md`, `tokens.csv`, and `averages.csv`.
- `2026-06-18T13-57-32-444Z`: earlier snapshot with `report.md`, `tokens.csv`, and `averages.csv`.

The public reports focus on token usage, token reduction versus the no-plugin baseline, and calculated model-token cost for the recorded runs.

## What The Harness Compares

The harness runs the same opencode task suite against several adapter configurations:

- `baseline`: opencode without an optimization plugin.
- `tokenwarden`: opencode with TokenWarden enabled.
- `openslimedit`: opencode with OpenSlimEdit enabled.
- `dcp`: opencode with DCP enabled.
- `openrtk`: opencode with OpenRTK enabled.

Each adapter is isolated in its own generated workspace and opencode configuration.

## Repository Layout

```text
bench/
  adapters/                  Adapter definitions.
  fixtures/                  Fixture patches used by benchmark tasks.
  lib/                       Runner, reporting, workspace, and opencode helpers.
  models.json                Selectable benchmark model presets.
  report.mjs                 Rebuilds reports from a result summary.
  results/                   Sanitized published result snapshots.
  run-opencode-benchmark.mjs Main benchmark runner.
  tasks/                     Task suite definitions.
  tests/                     Node test runner coverage for harness utilities.
```

## Run The Harness

Install opencode and configure the provider/model you want to benchmark before running real tasks.

```sh
npm test
npm run bench:dry
npm run bench -- --model openrouter-glm-5.2
```

Useful options:

```sh
--plugins baseline,tokenwarden,openslimedit,dcp,openrtk
--tasks routing-read-write-ledger,helper-read-write-ledger,core-api-read-write-ledger
--runs 3
--suite hono.v1
--model openrouter-glm-5.2
--results bench/results/custom-run
--workspace /tmp/tokenwarden-bench/custom-run
```

Regenerate reports for a result directory:

```sh
npm run bench:report -- --results bench/results/<run-id>
```

The report command writes:

- `report.md`
- `tokens.csv`
- `averages.csv`

## Result Columns

`tokens.csv` includes one row per adapter, task, and run:

```text
plugin,task,run,dry_run,prepare_only,input_tokens,output_tokens,cache_read_tokens,cache_write_tokens,total_tokens,provider_estimated_cost_usd,input_cost_usd,output_cost_usd,calculated_cost_usd,saved_vs_baseline,saved_percent,saved_cost_vs_baseline,saved_cost_percent
```

`averages.csv` includes task-level aggregates:

```text
task,plugin,runs,average_input_tokens,average_output_tokens,average_cache_read_tokens,average_cache_write_tokens,average_total_tokens,average_provider_estimated_cost_usd,average_input_cost_usd,average_output_cost_usd,average_calculated_cost_usd,average_saved_vs_baseline,average_saved_percent,average_saved_cost_vs_baseline,average_saved_cost_percent
```
