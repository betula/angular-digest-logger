
ng.controller('DigestLoggerController', [
  '$scope',
  '$attrs',
  '$rootScope',
  function($scope, $attrs, $rootScope){
    var
      getLoggerName = function() {
        return $attrs.loggerName;
      },
      lastLogDate,
      logAction = function(action){
        var
          name = getLoggerName(),
          log = [],
          date = new Date();
        if (name) {
          log.push(name);
        }
        if (action) {
          log.push(action);
        }
        if (lastLogDate) {
          log.push(date.getMinutes() + ':' + date.getSeconds());
          log.push((date.getTime() - lastLogDate.getTime()) + 'ms');
        }
        lastLogDate = date;
        console.log.apply(console, log);
      },
      postDigestLogger,
      _apply,
      _digest;

    _apply = $rootScope.$apply;
    $rootScope.$apply = function() {
      var
        result;
      logAction('> $apply()');
      result = _apply.apply(this, arguments);
      logAction('< $apply()');
      return result;
    };

    _digest = $rootScope.$digest;
    $rootScope.$digest = function() {
      var
        result;
      logAction('> $digest()');
      result = _digest.apply(this, arguments);
      logAction('< $digest()');
      return result;
    };

    $scope.$watch(function() {
      logAction('. $digest');
      if (!postDigestLogger) {
        postDigestLogger = once(function() {
          logAction('. $postDigest');
          postDigestLogger = null;
        });
      }

      $scope.$$postDigest(postDigestLogger);
    });

    function once(callback) {
      var
        called = false;
      return function() {
        if (!called) {
          called = true;
          return callback.apply(this, arguments);
        }
      }
    }
  }
]);