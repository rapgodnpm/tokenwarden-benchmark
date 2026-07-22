export function assertDockerRuntime(env = process.env) {
  if (env.TOKENWARDEN_BENCH_IN_DOCKER !== "1") {
    throw new Error("Benchmark commands must run through Docker. Use the npm scripts documented in README.md.")
  }
}
