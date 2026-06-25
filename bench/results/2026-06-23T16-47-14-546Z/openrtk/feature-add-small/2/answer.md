I need to add title-case mode support to the formatTitle function. The test expects "hello benchmark world" to become "Hello Benchmark World" in title mode.







I'll add title case support with a minimal implementation:










**Summary:**

- **File edited:** `bench-targets/feature/src/formatTitle.mjs`
- **Change:** Added `title` mode support (line 4) that splits by whitespace, capitalizes first letter of each word, lowercases the rest, and joins back
- **Command run:** `node --test bench-targets/feature/formatTitle.test.mjs`
- **Verification status:** ✅ Pass (1 test passed, 0 failed)
