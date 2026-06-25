The root cause is the loop at lines 6-9 that repeats the same error message 60 times unnecessarily. The fix is to remove the loop and just emit the error once.







Fixed with minimal change (removed loop). Verification: only 1 error emitted instead of 60.
