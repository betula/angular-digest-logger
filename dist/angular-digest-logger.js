;(function(angular, document) {


var ng = angular.module('digestLogger', []);


ng.controller('DigestLoggerController', [
  '$scope',
  '$attrs',
  '$rootScope',
  '$log',
  function($scope, $attrs, $rootScope, $log){
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
        $log.log(log.join(' '));
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

ng.directive('body', ['digestLogger', function(digestLogger) {
  return digestLogger.enabled
    ? {
      restrict: 'E',
      priority: 2000,
      // Use controller only for priority
      controller: 'DigestLoggerController'
    }
    : function(){}
}]);

ng.directive('digestLogger', [
  function() {
    return {
      priority: 2000,
      // Use controller only for priority
      controller: 'DigestLoggerController'
    };
  }
]);

ng.provider('digestLogger', function() {
  var
    _useCookie = true,
    _cookieName = '--digest-logger',
    _enabled = false;

  this.useCookie = function(flag, cookieName) {
    if (typeof flag == 'undefined') {
      flag = true;
    }

    if (cookieName) {
      _cookieName = cookieName;
    }
    _useCookie = flag;
  };

  this.enabled = function(flag) {
    if (typeof flag == 'undefined') {
      flag = true;
    }
    _enabled = flag;
  };

  this.$get = [function() {

    return {
      enabled: _enabled
        ? true
        : _useCookie && document.cookie.indexOf(_cookieName) > -1
    };

  }];

});

})(window.angular, window.document);