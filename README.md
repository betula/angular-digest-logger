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

## Legeng

    `> $apply` - call $scope.$apply function
    `> $digest` - call $scope.$digest function (usually in $apply function)
    `< $digest` - $scope.$digest call finished
    `< $apply` - $scope.$apply call finished
    `. $digest` - iteration of digest loop
    `. $postDigest` - end of digest digest
    
    

