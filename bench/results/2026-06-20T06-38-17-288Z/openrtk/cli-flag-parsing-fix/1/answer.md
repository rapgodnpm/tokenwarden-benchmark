The current parser is too simplistic - it only handles boolean flags. I need to handle:
1. Positional arguments (not starting with --)
2. Boolean flags (`--flag`)
3. Key=value pairs (`--flag=value`)
4. Key value pairs (`--flag value`)

Let me write the fixed parser:
