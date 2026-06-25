The source file has duplicated `value.trim().replace(/\s+/g, ' ')` in both `formatFirstName` and `formatLastName`. I'll extract this as a shared `normalizeName` helper.





Refactored successfully. Created `normalizeName` helper that consolidates the duplicated `value.trim().replace(/\s+/g, ' ')` logic, updated both formatters to use it. Tests pass (1 pass, 0 fail).
