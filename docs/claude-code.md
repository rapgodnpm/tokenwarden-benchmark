# Claude Code benchmark

The Claude Code benchmark uses the same task prompts, fixtures, repositories, and automated checks as the OpenCode benchmark. Claude Code runs in an isolated home and configuration directory so user plugins, MCP servers, credentials, and settings do not affect results.

## Requirements

- Node.js 22.5 or later. Context Mode requires it.
- Claude Code 2.1.139 or later. TokenWarden requires it.
- LM Studio with the local server enabled.
- `qwen/qwen3.5-9b` loaded in LM Studio.
- A local TokenWarden checkout with a built `@tokenwarden/claude-code` package.

By default, the runner expects the TokenWarden checkout at `../token-optimizer/packages/claude-code` relative to this repository. Override it when needed:

```sh
export TOKENWARDEN_CLAUDE_PACKAGE=/absolute/path/to/packages/claude-code
```

The directory must contain `package.json` and `dist/src/cli.js`. Build it from the TokenWarden monorepo before preparing the benchmark:

```sh
npm run build -w @tokenwarden/claude-code
```

## LM Studio

Start the LM Studio server on port 1234 and load `qwen/qwen3.5-9b`. The runner uses:

```sh
ANTHROPIC_BASE_URL=http://localhost:1234
ANTHROPIC_AUTH_TOKEN=lmstudio
```

Use a 128,000-token context window to match the OpenCode LM Studio preset:

```sh
lms server start --port 1234
lms load qwen/qwen3.5-9b --identifier qwen/qwen3.5-9b --context-length 128000 --yes
```

If LM Studio requires authentication, export `LM_API_TOKEN`. Use `LMSTUDIO_BASE_URL` or `--lmstudio-base-url` for a different server URL.

The runner checks `GET /v1/models` before making model calls and stops when the requested model is unavailable.

## Commands

```sh
npm run bench:claude-code:dry
npm run bench:claude-code:prepare
npm run bench:claude-code -- --plugins baseline,tokenwarden --tasks react-state-bug-fix --runs 1
npm run bench:report:claude-code -- --no-open
```

The default model key is `lmstudio-qwen3.5-9b`. Claude Code receives the LM Studio model ID `qwen/qwen3.5-9b`.

## Configurations

| ID | Integration | What it changes |
| --- | --- | --- |
| `baseline` | None | Measures Claude Code without optimization plugins or hooks. |
| `tokenwarden` | Local Claude Code plugin | Focuses repository context and reduces large successful tool output. |
| `context-mode` | `context-mode@1.0.169` plugin | Routes large context through sandbox and retrieval tools. |
| `rtk` | RTK 0.43.0 PreToolUse hook | Rewrites supported shell commands to reduce command output. |
| `caveman` | Caveman 1.9.1 plugin | Makes final prose shorter. It does not reduce input context. |

Only one configuration is enabled per run. The baseline therefore remains attributable, and combinations do not hide which integration changed token use.

## Isolation

Claude Code receives `Bash`, `Read`, `Edit`, `Write`, `Glob`, and `Grep`. It cannot use browser, subagent, or user-question tools. MCP tools are available only for adapters that require them.

The runner disables nonessential Claude Code traffic, removes inherited `ANTHROPIC_API_KEY`, and uses an isolated `CLAUDE_CONFIG_DIR`. Context Mode and Caveman load with session-local `--plugin-dir` arguments. TokenWarden uses its user installer plus an explicit MCP configuration inside the disposable home, and RTK writes its hook into the same isolated configuration.

Results include Claude Code JSONL, final answer, verification output, normalized usage, cache tokens, plugin errors, plugin version, and local TokenWarden report when applicable.

Claude Code can emit a dollar estimate for a custom local model. That value is recorded as a provider estimate, not an LM Studio bill. The report's calculated cost uses the same fixed comparison prices as the OpenCode report.
