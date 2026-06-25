The root cause is in `typecheck.mjs`: it loops 60 times printing the same error message. The smallest fix is to remove the loop:







Fixed. Now only one error is emitted instead of 60 repeats.
