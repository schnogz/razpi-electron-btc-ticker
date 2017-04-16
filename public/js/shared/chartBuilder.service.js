angular
  .module('app.shared', [])
  .service('chartService', function () {
    return {
      /*
      * configures an AmChart
      *
      * chartConfig Object
      *  id: HTML element to draw chart in
      *  title: title of the chart
      *  timeFormat: time format
      *  yAxis: Object {
      *    balloonText: hover text
      *    title: axis title
      *    unit: display unit
      *  }
      *
      */
      buildChart: function(chartData, chartConfig) {
        AmCharts.makeChart(chartConfig.id, {
          type: "serial",
          categoryField: "x", // date
          dataDateFormat: chartConfig.timeFormat,
          startDuration: 1,
          handDrawScatter: 1,
          precision: 2,
          processCount: 1005,
          theme: "default",
          categoryAxis: {
            gridPosition: "start",
            minPeriod: chartConfig.minTimePeriod ? chartConfig.minTimePeriod : '',
            parseDates: !!chartConfig.parseDates
          },
          chartCursor: {
            limitToGraph: chartConfig.id,
            enabled: true
          },
          chartScrollbar: {
            enabled: true
          },
          graphs: [{
            balloonText: chartConfig.yAxis.balloonText,
            valueField: "y" // price, percentage
          }],
          guides: [],
          valueAxes: [{
            title: chartConfig.yAxis.title,
            unit: chartConfig.yAxis.unit,
            unitPosition: 'left'
          }],
          balloon: {},
          titles: [{
            size: 18,
            color: 'rgb(0,105,92)',
            text: chartConfig.title
          }],
          dataProvider: chartData
        });
      }
    }
  });