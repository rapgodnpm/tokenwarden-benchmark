FROM debian:trixie-slim

ARG NODE_VERSION=22.16.0
ARG CLAUDE_CODE_VERSION=2.1.212
ARG OPENCODE_VERSION=1.18.4
ARG TARGETARCH

RUN apt-get update \
  && apt-get install --yes --no-install-recommends ca-certificates curl git openssh-client tar unzip xz-utils \
  && rm -rf /var/lib/apt/lists/* \
  && case "${TARGETARCH}" in amd64) node_arch=x64 ;; arm64) node_arch=arm64 ;; *) echo "unsupported architecture: ${TARGETARCH}" >&2; exit 1 ;; esac \
  && curl --fail --location --silent --show-error "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${node_arch}.tar.xz" \
    | tar --extract --xz --directory /usr/local --strip-components=1 \
  && npm install --global "@anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}" "opencode-ai@${OPENCODE_VERSION}" \
  && npm cache clean --force

ENV CI=1 \
  DISABLE_AUTOUPDATER=1 \
  DISABLE_TELEMETRY=1 \
  TOKENWARDEN_BENCH_IN_DOCKER=1

COPY docker/lmstudio-proxy.mjs /opt/tokenwarden-benchmark/lmstudio-proxy.mjs

WORKDIR /workspace
