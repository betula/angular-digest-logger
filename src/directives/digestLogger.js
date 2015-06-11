
ng.directive('digestLogger', [
  function() {
    return {
      priority: 2000,
      // Use controller only for priority
      controller: 'DigestLoggerController'
    };
  }
]);