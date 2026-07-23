Benchmark task: code-review-diagnosis
Repository: https://github.com/honojs/hono.git

Review bench-targets/review/src/payment.mjs without editing source files. Create bench-artifacts/code-review-diagnosis.md. Use findings-first review format with headings '# Code Review Diagnosis', '## Findings', and '## Residual Risks'. Identify concrete risks from the actual code, including missing amount validation and gateway error handling. Do not modify bench-targets/review/src/payment.mjs.

Constraints:
- Do not ask the user to write prompts or inspect files manually.
- Prefer the smallest safe code change when edits are required.
- Include exact file paths, commands run, and verification status in the final answer.
