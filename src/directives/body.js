
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