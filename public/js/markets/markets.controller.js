angular
  .module('app.markets', [])
  .controller('marketsCtrl', function ($scope, $http) {

    $scope.isLoading = true;

    $http.get('/priceChart').then(function(resp) {
      // remove last data ppint since it seems to be wildly inaccurate
      data = _.dropRight(resp.data, 1);

      // convert unix timestamps to JS date object
      _.each(data, function(point) {
        point.x = AmCharts.formatDate(new Date(parseInt(point.x)*1000), "M/D/YY");
      });

      _buiildChart(data);
      $scope.isLoading = false;
    });

    function _buiildChart(chartData) {
      AmCharts.makeChart("priceChart", {
        type: "serial",
        categoryField: "x", // date
        dataDateFormat: "MM/DD/YY",
        startDuration: 1,
        handDrawScatter: 1,
        precision: 2,
        processCount: 1005,
        theme: "default",
        categoryAxis: {
          gridPosition: "start"
        },
        chartCursor: {
          limitToGraph: "priceChart",
          enabled: true
        },
        chartScrollbar: {
          enabled: true
        },
        graphs: [{
          balloonText: "$[[value]]",
          valueField: "y" // price
        }],
        guides: [],
        valueAxes: [{
          id: "ValueAxis-1",
          title: "Price",
          unit: '$',
          unitPosition: 'left'
        }],
        balloon: {},
        titles: [{
          id: "Title-1",
          size: 15,
          text: "Average Market Price (USD)"
        }],
        dataProvider: chartData
      });
    }
});