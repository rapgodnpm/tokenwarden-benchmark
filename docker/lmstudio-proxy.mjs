import { createServer, connect } from "node:net"

const upstreamHost = process.env.UPSTREAM_HOST ?? "host.docker.internal"
const upstreamPort = Number(process.env.UPSTREAM_PORT ?? 1234)
const listenPort = Number(process.env.LISTEN_PORT ?? 1234)
let lastUpstreamError = ""

const server = createServer((client) => {
  const upstream = connect({ host: upstreamHost, port: upstreamPort })
  client.pipe(upstream).pipe(client)
  const close = () => {
    client.destroy()
    upstream.destroy()
  }
  client.on("error", close)
  upstream.on("connect", () => {
    if (lastUpstreamError) process.stderr.write(`[lmstudio-proxy] upstream connection restored\n`)
    lastUpstreamError = ""
  })
  upstream.on("error", (error) => {
    const message = `${error.code ?? "ERROR"}: ${error.message}`
    if (message !== lastUpstreamError) {
      process.stderr.write(`[lmstudio-proxy] cannot connect to ${upstreamHost}:${upstreamPort}: ${message}\n`)
      lastUpstreamError = message
    }
    close()
  })
})

server.on("error", (error) => {
  process.stderr.write(`[lmstudio-proxy] server error: ${error.stack ?? error}\n`)
  process.exitCode = 1
})
server.listen(listenPort, "0.0.0.0", () => {
  process.stderr.write(`[lmstudio-proxy] listening on 0.0.0.0:${listenPort}, upstream ${upstreamHost}:${upstreamPort}\n`)
})

const shutdown = () => server.close(() => process.exit(0))
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
