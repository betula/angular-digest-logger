
describe('digestLogger', function() {
  var
    digestLoggerProvider,
    $compile,
    $scope,
    $log;

  beforeEach(module('digestLogger', function(digestLoggerProvider) {
    digestLoggerProvider.enabled(true);
  }));

  function make() {
    var
      element;
    element = $compile('<digest-logger />')($scope);
    $scope.$digest();
    return element;
  }

  beforeEach(function() {
    inject(function(_$compile_, _$rootScope_, _$log_){
      $compile = _$compile_;
      $scope = _$rootScope_;
      $log = _$log_;
    });
  });

  it('should work', inject(function() {
    spyOn($log, 'log');
    make();
    expect($log.log.calls.count()).toEqual(5);
  }));

});