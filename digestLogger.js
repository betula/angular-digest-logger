(function (root, factory) {

  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('angular'));
  } else {
    root.angularDigestLogger = factory(root.angular);
  }

}(this, function (angular) {

  return angular.module('digestLogger', [])

    .controller('DigestLoggerController', [
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
    ])

    .provider('digestLogger', function() {
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

      this.$get = ['$document', function($document) {

        return {
          enabled: _enabled
            ? true
            : _useCookie && $document[0].cookie.indexOf(_cookieName) > -1
        };

      }];

    })

    .directive('body', ['digestLogger', function(digestLogger) {
      return digestLogger.enabled
        ? {
        restrict: 'E',
        priority: 2000,
        // Use controller only for priority
        controller: 'DigestLoggerController'
      }
        : function(){}
    }])

}));
