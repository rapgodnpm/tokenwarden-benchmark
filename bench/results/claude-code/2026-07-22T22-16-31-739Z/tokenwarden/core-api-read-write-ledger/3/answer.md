

Task completed. The file has been created successfully.

**Verification command:**
```bash
head -50 bench-artifacts/core-api-read-write-ledger.md && echo "..." && tail -20 bench-artifacts/core-api-read-write-ledger.md && echo "" && wc -l bench-artifacts/core-api-read-write-ledger.md
```

**Verification status:** The output file exists with the header `# Core API Read/Write Ledger`, each of the 18 listed files has a `## <file path>` heading with five bullets each, and includes the final `## Path Inventory` section. The file contains exactly 110 lines.

The task only created `bench-artifacts/core-api-read-write-ledger.md` — no source code changes were made.
