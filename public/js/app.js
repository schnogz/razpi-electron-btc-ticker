(function(){
  'use strict';

  angular
    .module('app', [
      'ngMaterial',
      'ngAnimate',
      'ui.router',
      'app.markets',
      'app.blocks',
      'app.network'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
      function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        // configure app states
        $stateProvider
          .state({
            name: 'markets',
            url: '/markets',
            controller: 'marketsCtrl',
            templateUrl: 'js/markets/markets.html'
          })
          .state({
            name: 'network',
            url: '/network',
            controller: 'networkCtrl',
            templateUrl: 'js/network/network.html'
          })
          .state({
            name: 'blocks',
            url: '/blocks',
            controller: 'blocksCtrl',
            templateUrl: 'js/blocks/blocks.html'
          });

        // when there is an empty route, redirect to /markets
        $urlRouterProvider.when('', '/markets');

        // configure theme
        $mdThemingProvider.theme('default')
          .primaryPalette('teal')
          .accentPalette('red');
      }
    ]);

  angular
    .module('app')
    .controller('appCtrl', function ($rootScope, $scope) {
      $scope.menu = [{
        state: 'markets',
        title: 'Markets',
        icon: 'timeline',
        active: true
      }, {
        state: 'network',
        title: 'Network',
        icon: 'language',
        active: false
      }, {
        state: 'blocks',
        title: 'Blocks',
        icon: 'view_module',
        active: false
      }];

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        debugger;
        if (currentMenuItem) {
          currentMenuItem.active = true;
          prevMenuItem = findMenuItem(fromState.name);
          if (prevMenuItem && prevMenuItem.name !== currentMenuItem.name) {
            prevMenuItem.active = false;
          }
        } else {
          for (var i = 0; i < currentMenuItem.length; i++) {
            currentMenuItem[i].active = false;
          }
        }
      });
    })
})();
