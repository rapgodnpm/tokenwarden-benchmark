I can see the issue - the code prints the same error message 60 times in a loop. Let me verify this behavior and then apply a minimal fix.




Confirmed - 60 identical error messages (the index varies but the message is identical). Fix by removing the repetitive loop:







Fixed - single error message. Exit code: 1 (missing 'email' field).
