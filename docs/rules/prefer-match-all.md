# Prefer `String.prototype.matchAll` over `while` and `exec`

Prefer `String.prototype.matchAll` over `exec` used in a `while` loop condition
to iterate over the matches.

This rule is fixable.

## Fail

```js
let match;
while ((match = regexp.exec(str)) !== null) {
}
```

## Pass

```js
for (const match of str.matchAll(regexp)) {
}
```
