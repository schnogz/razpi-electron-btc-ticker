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
          controller: function($http, $interval) {
            var vm = this;

            var getBtcPrice = function() {
              $http.get('/stats').then(function(response) {
                vm.price = response.data.last;
              });
            };

            getBtcPrice();

            // update price every minute
            $interval(function() {
              getBtcPrice();
            }, 60000)
          }
        })
        .otherwise({redirectTo: '/'});

      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('red');
    }
})();
