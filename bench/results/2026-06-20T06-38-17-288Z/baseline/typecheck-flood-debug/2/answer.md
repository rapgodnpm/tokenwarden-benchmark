Now I can see the issue - the typecheck.mjs loop prints the same error 60 times (lines 6-8). Let me run the typecheck to see the actual errors:




The root cause is clear - the loop on lines 6-8 prints 60 identical errors. The fix is to remove the loop and just print a single error:




Now verify the fix:




**Fix verified.** Only emits a single error message now instead of 60 repeated ones.
