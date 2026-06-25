The root cause is clear: the script loops through index 0-59 and prints the same error message 60 times. The fix should deduplicate errors based on the error message content.










The fix works correctly: now **1 unique error** is emitted instead of 60 repeated ones, and the exit code remains `1`.
