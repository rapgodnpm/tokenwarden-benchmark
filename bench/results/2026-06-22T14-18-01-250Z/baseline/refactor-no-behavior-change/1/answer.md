I'll start by reading both the source and test files to understand the current implementation and what needs to be refactored.





I can see the duplicated logic - both functions use `value.trim().replace(/\s+/g, ' ')`. I'll extract a shared `normalizeName` helper and refactor the source file.




Now running the tests to verify the refactored code maintains the same behavior:




**Refactoring complete.** Created shared `normalizeName` helper that eliminates duplicated whitespace normalization. Both `formatFirstName` and `formatLastName` now delegate to it. All tests pass.

```
Test status: pass (1 test passed)
```
