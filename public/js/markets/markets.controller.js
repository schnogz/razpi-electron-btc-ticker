angular
  .module('app.markets', [])
  .controller('marketsCtrl', function ($scope, $http) {

    $scope.isLoading = true;
    $scope.timePeriod = '30d';

    // watch for user changes to timePeriod dropdown
    $scope.$watch('timePeriod', function (newVal) {
      $scope.isLoading = true;

      $http.get('/priceChart?timespan=' + newVal)
        .then(function(resp) {
          // convert unix timestamps to JS date objects
          _.each(resp.data, function(point) {
            point.x = AmCharts.formatDate(new Date(parseInt(point.x) * 1000), "M/D/YY");
          });

          _buildChart(resp.data);
          $scope.isLoading = false;
        });
    });

    function _buildChart(chartData) {
      // configuration for AmChart
      AmCharts.makeChart("priceChart", {
        type: "serial",
        categoryField: "x", // date
        dataDateFormat: "MM/DD/YY",
        startDuration: 1,
        handDrawScatter: 1,
        precision: 2,
        processCount: 1005,
        theme: "default",
        categoryAxis: { gridPosition: "start" },
        chartCursor: {
          limitToGraph: "priceChart",
          enabled: true
        },
        chartScrollbar: { enabled: true },
        graphs: [{
          balloonText: "$[[value]]",
          valueField: "y" // price
        }],
        guides: [],
        valueAxes: [{
          title: "Price",
          unit: '$',
          unitPosition: 'left'
        }],
        balloon: {},
        titles: [{
          size: 18,
          color: 'rgb(0,105,92)',
          text: "Average Market Price (USD)"
        }],
        dataProvider: chartData
      });
    }
});