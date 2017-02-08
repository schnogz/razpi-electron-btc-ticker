angular
  .module('app.markets', [])
  .controller('marketsCtrl', function ($scope, $http, $interval) {

    $scope.isLoading = true;

    // update price every minute
    $interval(function() {
      getBtcPrice();
    }, 60000);

    AmCharts.makeChart("priceChart", {
      type: "serial",
      categoryField: "date",
      dataDateFormat: "MM/DD/YY",
      startDuration: 1,
      handDrawScatter: 1,
      precision: 2,
      processCount: 1005,
      theme: "default",
      categoryAxis: {
        gridPosition: "start"
      },
      chartScrollbar: {
        enabled: true
      },
      trendLines: [],
      graphs: [{
        balloonText: "$[[value]]",
        bullet: "round",
        id: "AmGraph-1",
        valueField: "price"
      }],
      guides: [],
      valueAxes: [{
        id: "ValueAxis-1",
        title: "Price"
      }],
      allLabels: [],
      balloon: {},
      titles: [{
        id: "Title-1",
        size: 15,
        text: "Average Market Price (USD)"
      }],
      dataProvider: [
        {
          "date": "1/3/17",
          "price": "1023.141875"
        },
        {
          "date": "1/4/17",
          "price": "1126.763338"
        },
        {
          "date": "1/5/17",
          "price": "994.674875"
        },
        {
          "date": "1/6/17",
          "price": "883.099175"
        },
        {
          "date": "1/7/17",
          "price": "896.830375"
        },
        {
          "date": "1/8/17",
          "price": "908.1490375"
        },
        {
          "date": "1/9/17",
          "price": "894.18025"
        }
      ]
    }
  );
});