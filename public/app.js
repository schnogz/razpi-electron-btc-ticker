(function(){
  'use strict';

  angular.module('app', ['ngMaterial', 'ngAnimate', 'ngRoute']);

  angular
    .module('app')
    .config(['$routeProvider', '$mdThemingProvider', config]);

    function config($routeProvider, $mdThemingProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'content.html',
          controllerAs: 'vm',
          controller: function() {
            var vm = this;
          }
        })
        .otherwise({redirectTo: '/'});

      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('red');
    }
})();
