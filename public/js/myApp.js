angular.module('myApp');

var myApp = angular.module('myApp');

myApp
  .config(function ($routeProvider, MoviesProvider) {
    MoviesProvider.setEndpoint('/api');
  })
  .run([
    '$rootScope',
    'APP_VERSION',
    function ($rootScope, APP_VERSION) {
      console.log("start");
      $rootScope.version = APP_VERSION;
    }
  ]);
