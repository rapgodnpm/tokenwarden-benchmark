I'll start by reading the two files to understand the existing implementation and test structure.





Now I'll add title-case support using the existing mode-based pattern (upper/lower/plain):













**Verification status: Passed**

**Summary:**
- Read both files and identified the existing mode-based pattern (upper/lower/plain)
- Added title case mode: maps each word to capitalize first letter and lowercase the rest
- Test passes: `formatTitle('hello benchmark world', 'title')` returns `'Hello Benchmark World'`

```javascript
if (mode === 'title') 
  return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
```
