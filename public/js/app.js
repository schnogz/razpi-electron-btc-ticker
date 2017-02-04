(function(){
  'use strict';

  angular.module('app', ['ngMaterial', 'ngAnimate', 'ui.router']);

  angular
    .module('app')
    .config(['$stateProvider', '$mdThemingProvider', config]);

    function config($stateProvider, $mdThemingProvider) {
      // configure app states
      $stateProvider
        .state({
          name: 'markets',
          url: '/hello',
          template: '<h3>MARKETS</h3>'
        })
        .state({
          name: 'network',
          url: '/network',
          template: '<h3>NETWORK</h3>'
        })
        .state({
          name: 'blocks',
          url: '/blocks',
          template: '<h3>BLOCKS</h3>'
        });

      // configure theme
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('red');
    }

  angular
    .module('app')
    .controller('main', function ($scope, $http, $interval) {

      $scope.menu = [{
        state: 'markets',
        title: 'Markets',
        icon: 'timeline',
      }, {
        state: 'network',
        title: 'Network',
        icon: 'language'
      }, {
        state: 'blocks',
        title: 'Blocks',
        icon: 'view_module'
      }];

      var getBtcPrice = function() {
        $http.get('/stats').then(function(response) {
          $scope.price = response.data.last;
          $scope.lastUpdated = new Date();
        });
      };

      getBtcPrice();

      // update price every minute
      $interval(function() {
        getBtcPrice();
      }, 60000)

    })
})();
