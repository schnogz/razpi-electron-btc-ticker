(function(){
  'use strict';

  angular
    .module('app', [
      'ngMaterial',
      'ngAnimate',
      'ui.router',
      'md.data.table',
      'app.markets',
      'app.blocks',
      'app.network',
      'app.shared'
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
})();
