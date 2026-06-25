The parser is incomplete. It currently only handles boolean flags but misses --key value pairs and --key=value syntax.







The test expects `output` but I'm setting `--output`. The `--` should strip the `--` prefix for equals syntax.







Now `utput` is wrong - I need to fix the slice to start from 2:







Fixed. The parser now handles boolean flags, `--key value` pairs, and `--key=value` syntax.

**Fix:** Updated `--key=value` parsing to use `slice(2, eqIndex)` instead of `slice()` to correctly extract the key without the `--` prefix.

**Verification:** ✅ Test passed (1 pass, 0 fail).
