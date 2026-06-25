I understand the pattern. I need to add `'title'` mode that capitalizes each word. Let me add this to `formatTitle.mjs`:







**File modified:** `bench-targets/feature/src/formatTitle.mjs`

**Change:** Added `'title'` mode using existing pattern - converts text to title case with each word properly capitalized (titleCase instead of title case).

**Verification:** `node --test bench-targets/feature/formatTitle.test.mjs` — **1/1 tests passed** ✓
