# AngularJS Digest loops logger

For activate you need add cookie `--digest-logger` for example:

```js
document.cookie = '--digest-logger=';
```

For deactivate you need remove cookie `--digest-logger` for example:

```js
document.cookie = '--digest-logger=;max-age=0';
```

F5
Enjoy!

## Legend

`> $apply` - log `$scope.$apply` function call

`> $digest` - log `$scope.$digest` function call (usually in `$scope.$apply` function call)

`< $digest` - log `$scope.$digest` call finished

`< $apply` - log `$scope.$apply` call finished

`. $digest` - iteration of digest loop

`. $postDigest` - end of digest loop
    
## Installing

```bash
npm install betula/angular-digest-logger#v1.0.2
```

