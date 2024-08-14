# Some Notes (almost guidance) on Dependencies with TypeScript Applications

## No modifications of Package.json or Package-lock.json can be combined with any other PR.

```js
const newString = leftPad('tacos', 10); // '     tacos'
```

## Semver - semver.org

date-fns 3.1.0 -> 4.0.0

- 3 - Major
    - We screwed up. At least one thing could possible break your code.
- 1 - Minor
    - backward compatible, but has some new stuff.
- 0 - Patch
    - you should install this because it has backward compatible bug fixes.
2.0.0 ->
3.1.0 -> 3.1.1 -> 3.1.2 ->
3.2.0 -> 3.2.1

## developers on your team should never do NPM I when they clone the repo. They should always and frequently do npm ci


## You and your team should be using the same version of node as you are running in production
    - 