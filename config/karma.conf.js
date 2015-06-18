
module.exports = function(config) {
  var
    dependencies,
    tests;

  tests = [
    'test/**/*.spec.js'
  ];

  dependencies = [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'dist/angular-digest-logger.min.js'
  ];

  config.set({

    basePath: __dirname + '/..',
    frameworks: ['jasmine'],
    files: dependencies.concat(tests),

    port: 9876,
    reporters: ['mocha'],
    colors: true,

    autoWatch: false,
    singleRun: true,

    browsers: [
      'Chrome',
      'Firefox'
    ]
  });

};