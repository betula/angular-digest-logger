
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