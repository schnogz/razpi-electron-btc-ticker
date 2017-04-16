angular
  .module('app.markets', [])
  .controller('marketsCtrl', function ($scope, $http, chartService) {

    $scope.isLoading = true;
    $scope.timePeriod = '30d';

    // watch for user changes to timePeriod dropdown
    $scope.$watch('timePeriod', function (newVal) {
      $scope.isLoading = true;

      $http.get('/blockchainChartInfo?chartType=market-price&timespan=' + newVal)
        .then(function(resp) {
          // convert unix timestamps to JS date objects
          _.each(resp.data, function(point) {
            point.x = AmCharts.formatDate(new Date(parseInt(point.x) * 1000), "M/D/YY");
          });

          chartService.buildChart(resp.data, {
            id: "priceChart",
            title: "Average Market Price (USD)",
            timeFormat: "MM/DD/YY",
            yAxis: {
              balloonText:"$[[value]]",
              title: "Price",
              unit: "$"
            },
          });

          $scope.isLoading = false;
        });
    });
});