import { createServer, connect } from "node:net"

const upstreamHost = process.env.UPSTREAM_HOST ?? "host.docker.internal"
const upstreamPort = Number(process.env.UPSTREAM_PORT ?? 1234)
const listenPort = Number(process.env.LISTEN_PORT ?? 1234)

const server = createServer((client) => {
  const upstream = connect({ host: upstreamHost, port: upstreamPort })
  client.pipe(upstream).pipe(client)
  const close = () => {
    client.destroy()
    upstream.destroy()
  }
  client.on("error", close)
  upstream.on("error", close)
})

server.listen(listenPort, "0.0.0.0")

const shutdown = () => server.close(() => process.exit(0))
process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
