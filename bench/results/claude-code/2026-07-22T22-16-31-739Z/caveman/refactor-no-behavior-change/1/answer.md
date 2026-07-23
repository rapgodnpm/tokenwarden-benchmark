

**Status:** Tests pass.

**Summary:**
- `/work/caveman-refactor-no-behavior-change-1/repo/bench-targets/refactor/src/name-formatters.mjs`: Added `normalizeName` helper function. Both `formatFirstName` and `formatLastName` now call it instead of duplicating `.trim().replace(/\s+/g, ' ')`. Public exports unchanged.
