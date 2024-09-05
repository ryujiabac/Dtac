var myapp = angular.module('mockup', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.rowEdit'
                        , 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'highcharts-ng'])
myapp.controller('hichartCtrl', ['$scope', '$window', '$http', '$log', '$timeout', 'uiGridConstants', function ($scope, $window, $http, $log, $timeout, uiGridConstants) {
    //$scope.datas = '';
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    //-------------------------------------------------UI_GRID------------------------------------------------------------------//
    $scope.EditGridData = [];
    $scope.DeleteGridData = [];
    $scope.msg = {};
    $scope.solutionData = [];
    $scope.gridOptions1 = {};
    $scope.gridOptions1 = { enableRowSelection: true, enableRowHeaderSelection: false, enableSelectAll: true, showGridFooter: true };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;


    $scope.gridOptions2 = {};
    $scope.gridOptions2 = { enableSelectAll: true };
    $scope.gridOptions2.multiSelect = false;
    $scope.gridOptions2.modifierKeysToMultiSelect = false;
    $scope.gridOptions2.noUnselect = false;


    $scope.gridOptions1 = {
        // enableFiltering: true,
        enablePagination: false,
        enablePaginationControls: false,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
        showColumnFooter: true,
        showGridFooter: true,
        //paginationPageSizes: [25, 50, 75],
        //paginationPageSize: 25,		
        columnDefs: [
          { displayName: 'Problem Category', field: 'Problem Category', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 220 },
          { displayName: 'Nation Wide', field: 'NationWide', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
          { displayName: 'BMA', field: 'BMA', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
          { displayName: 'North', field: 'North', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
          { displayName: 'Central East', field: 'Central & East', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
          { displayName: 'North East', field: 'NorthEast', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
          { displayName: 'South West', field: 'South & West', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number', aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true },
        ]
    };

    $scope.gridOptions2 = {
        // enableFiltering: true,
        //paginationPageSizes: [25, 50, 75],
        //paginationPageSize: 25,
        enablePagination: false,
        enablePaginationControls: false,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [

          { displayName: 'Pending', field: 'Pending', enableFiltering: false, minWidth: 90, sort: { direction: uiGridConstants.ASC, priority: 0 } },
          { displayName: 'BMA', field: 'BMA', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number' },
          { displayName: 'Central & East', field: 'Central & East', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number' },
          { displayName: 'North', field: 'North', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number' },
           { displayName: 'NorthEast', field: 'NorthEast', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number' },
          { displayName: 'South & West', field: 'South & West', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90, type: 'number' },
        ]
    };


    $scope.gridOptions1.enableGridMenu = false;
    $scope.gridOptions1.enableColumnResizing = true;
    $scope.gridOptions1.enableFiltering = true;
    $scope.gridOptions1.fastWatch = true;
    //$scope.enableRowSelection = true;
    $scope.gridOptions1.enableRowHeaderSelection = false;
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;

    $scope.gridOptions2.enableGridMenu = false;
    $scope.gridOptions2.enableColumnResizing = true;
    $scope.gridOptions2.enableFiltering = true;
    $scope.gridOptions2.fastWatch = true;

    $scope.gridOptions2.enableRowHeaderSelection = false;
    $scope.gridOptions2.multiSelect = true;
    $scope.gridOptions2.modifierKeysToMultiSelect = false;
    $scope.gridOptions2.noUnselect = true;

    $http.post("WebServiceMockUp.asmx/getProblemCategory",
       {})// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
      .success(function (data, status, headers, config) {
          var obj = JSON.parse(data.d);
          $scope.gridOptions1.data = obj;

      })
   .error(function (data, status, headers, config) {
       var x = data
   });


    $http.post("WebServiceMockUp.asmx/getPendingCount",
      {})// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
     .success(function (data, status, headers, config) {
         var obj = JSON.parse(data.d);
         $scope.gridOptions2.data = obj;

     })
  .error(function (data, status, headers, config) {
      var x = data
  });


    // -----------------------------------------------------------------------------------------------------
    $http.get("GetHightChartData.aspx")
          .success(function (getdata, status, headers, config) {
              var output = [];
              var xAxisData = [];
              var arrayCols = ["New TT", "Closed TT", "Accumulated TT"];

              for (var i = 0; i < arrayCols.length; i++) {
                  var arrData = [];
                  for (var j = 0; j < getdata.length; j++) {
                      arrData.push(getdata[j][arrayCols[i]]);
                      if (i == 0) xAxisData.push('WK' + getdata[j].WK);
                  }
                  output.push({
                      name: arrayCols[i],
                      data: arrData
                  });

              }
              $scope.chartConfig = {
                  options: {
                      chart: {
                          type: 'column'
                      }
                  },
                  series: output,
                  title: {
                      text: 'Worst Cell / Latest Week'
                  },
                  xAxis: {
                      categories: xAxisData
                  },
                  yAxis: {

                      title: {
                          text: 'Number of IM'
                      }
                  },
                  loading: false
              };
          })
      .error(function (data, status, headers, config) {
          var x = data
      });
    //---------------------------------------------------------------------------------------------
    $http.get("GetHightChartData.aspx")
         .success(function (getdata, status, headers, config) {
             var output = [];
             var xAxisData = [];
             var arrayCols = ["Closed TT"];
             for (var i = 0; i < arrayCols.length; i++) {
                 var arrData = [];
                 for (var j = 0; j < getdata.length; j++) {
                     arrData.push(getdata[j][arrayCols[i]] * -1); //The value from DB is (-)  So Multiply with -1 to swap to (+)
                     if (i == 0) xAxisData.push('WK' + getdata[j].WK);
                 }
                 output.push({
                     name: arrayCols[i],
                     data: arrData
                 });

             }
             $scope.chartConfig_ClosedIM = {
                 options: {
                     chart: {
                         type: 'line'
                     }
                 },
                 series: output,
                 title: {
                     text: 'Worst Cell / Closed'
                 },
                 xAxis: {
                     categories: xAxisData
                 },
                 yAxis: {

                     title: {
                         text: 'Number of IM'
                     }
                 },
                 loading: false
             };
         })
     .error(function (data, status, headers, config) {
         var x = data
     });
    //---------------------------------------------------------------------------------------------


    //---------------------------------------------------------------------------------------------
    $http.get("GetHightChartDataLine.aspx")
         .success(function (getdata, status, headers, config) {
             var output = [];
             var xAxisData = [];
             var arrayCols = ["New TT", "Closed TT", "Accumulated TT"];
             for (var i = 0; i < arrayCols.length; i++) {
                 var arrData = [];
                 for (var j = 0; j < getdata.length; j++) {
                     arrData.push(getdata[j][arrayCols[i]]);
                     if (i == 0) xAxisData.push('WK' + getdata[j].WK);
                 }
                 output.push({
                     name: arrayCols[i],
                     data: arrData
                 });

             }
             $scope.chartConfigLine = {
                 options: {
                     chart: {
                         type: 'line'
                     }
                 },
                 series: output,
                 title: {
                     text: 'Worst Cell / Week'
                 },
                 xAxis: {
                     categories: xAxisData
                 },
                 yAxis: {

                     title: {
                         text: 'Number of IM'
                     }
                 },
                 loading: false
             };
         })
     .error(function (data, status, headers, config) {
         var x = data
     });
    //-----------------------------------------------------------------
    $http.get("GetHightChartDataPie_ProblemCat_ClosedIM.aspx")
        .success(function (getdata, status, headers, config) {

            $scope.output = [];
            for (var i = 0; i < getdata.length; i++) {
                $scope.output.push({
                    name: getdata[i]["Problem Category"],
                    y: getdata[i]["Amount"]
                });
            }
            $scope.chartConfig_ProblemCat_Pie = {
                credits: { enabled: false },
                options: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                //format: '<b>{point.name}</b>: {point.percentage:.1f} % : {point.y:.2f}',
                                format: '<b>{point.name}</b>: {point.percentage:.1f} % : ({point.y})',

                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    }
                },
                title: {
                    text: 'Problem Category (Closed)'
                },
                tooltip: {
                    //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    pointFormat: 'Value: {point.y:.2f}'
                },

                series: [{
                    name: "Brands",
                    colorByPoint: true,
                    data: $scope.output
                }]
            };
        })
    .error(function (data, status, headers, config) {
        var x = data
    });
    //-----------------------------------------------------------------
    $http.get("GetHightChartDataStack.aspx")
        .success(function (getdata, status, headers, config) {
            var output = [];
            var xAxisData = [];
            var arrayCols = ["New TT", "Closed TT", "Accumulated TT"];
            for (var i = 0; i < arrayCols.length; i++) {
                var arrData = [];
                for (var j = 0; j < getdata.length; j++) {
                    arrData.push(getdata[j][arrayCols[i]]);
                    if (i == 0) xAxisData.push('WK' + getdata[j].WK);
                }
                output.push({
                    name: arrayCols[i],
                    data: arrData
                });

                //if(arrayCols[i] == 'Closed TT'){
                //	output[output.length-1].borderRadiusBottomLeft = 15;
                //	output[output.length-1].borderRadiusBottomRight = 15;
                //}
            }
            if (output.length > 0) {
                output[0].borderRadiusTopLeft = 15;
                output[0].borderRadiusTopRight = 15;
            }
            $scope.chartConfigStack = {
                credits: { enabled: false },
                options: {
                    chart: {
                        type: 'column'
                    },
                    legend: {
                        align: 'center',
                        x: 30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                style: {
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }
                    }
                },
                series: output,
                title: {
                    text: 'Worst Cell Statistic Weekly'
                },
                xAxis: {
                    categories: xAxisData
                },
                yAxis: {

                    title: {
                        text: 'Number of IM'
                    }
                },
                loading: false
            };
        })
    .error(function (data, status, headers, config) {
        var x = data
    });
    //------------------------------------------------------------------
    //Chart for PS CS
    $http.get("GetHightChartDataPSCS.aspx")
        .success(function (getdata, status, headers, config) {
            var output = [];
            var xAxisData = [];
            var arrayCols = ["CS", "PS"];
            for (var i = 0; i < arrayCols.length; i++) {
                var arrData = [];
                for (var j = 0; j < getdata.length; j++) {
                    arrData.push(getdata[j][arrayCols[i]]);
                    if (i == 0) xAxisData.push('WK' + getdata[j].WK);
                }
                output.push({
                    name: arrayCols[i],
                    data: arrData
                });

            }
            $scope.chartConfigPSCS = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    legend: {
                        align: 'center',
                        x: -30,
                        verticalAlign: 'top',
                        y: 25,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                        borderColor: '#CCC',
                        borderWidth: 1,
                        shadow: false
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.x + '</b><br/>' +
                                this.series.name + ': ' + this.y + '<br/>' +
                                'Total: ' + this.point.stackTotal;
                        }
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                                style: {
                                    textShadow: '0 0 3px black'
                                }
                            }
                        }
                    }
                },
                series: output,
                title: {
                    text: 'PS CS / Week'
                },
                xAxis: {
                    categories: xAxisData
                },
                yAxis: {

                    title: {
                        text: 'Number of IM'
                    }
                },
                loading: false
            };
        })
    .error(function (data, status, headers, config) {
        var x = data
    });
    //----------------------------------------------------------------
    $http.get("GetHightChartPieCS.aspx")
     .success(function (getdata, status, headers, config) {
         $scope.outputCS = [];
         var OthersSum = 0;
         for (var i = 0; i < getdata.length; i++) {
             if (i < 5) {
                 $scope.outputCS.push({
                     name: getdata[i]["KPI_NAME"],
                     y: getdata[i]["CNT"]
                 });
             }
             else {
                 OthersSum += parseInt(getdata[i]["CNT"]);
             }
         }
         $scope.outputCS.push({
             name: "Others",
             y: OthersSum
         });
         $scope.$broadcast('EVENT_ON_LOADCS', $scope.outputCS);
     })
  .error(function (data, status, headers, config) {
      var x = data
  });
    //--------------------------------------------------------------------------------------
    $scope.PieChartCSChange = function () {
        $scope.CSType = $scope.modelCS;
        $http.get("GetHightChartPieCS.aspx?MobileType=" + $scope.CSType)
        .success(function (getdata, status, headers, config) {
            $scope.outputCS = [];
            var OthersSum = 0;
            for (var i = 0; i < getdata.length; i++) {
                if (i < 5) {
                    $scope.outputCS.push({
                        name: getdata[i]["KPI_NAME"],
                        y: getdata[i]["CNT"]
                    });
                }
                else {
                    OthersSum += parseInt(getdata[i]["CNT"]);
                }
            }
            if (OthersSum != '0') {
                $scope.outputCS.push({
                    name: "Others",
                    y: OthersSum
                });
            }
            //BroadCast from Top To Bottom
            $scope.$broadcast('EVENT_ON_LOADCS', $scope.outputCS);
        })
       .error(function (data, status, headers, config) {
           var x = data
       });
    }
    //--------------------------------------------------------------------------------------

    $scope.$on('EVENT_ON_LOADCS', function (event, datas) {
        var summary = 0;
        for (var i = 0; i < datas.length; i++) {
            summary += datas[i].y;
        }
        $scope.chartConfigPieCS = {
            credits: { enabled: false },
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    margin: [0, 0, 0, 0],
                    spacingTop: 0,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingRight: 0
                    //height: 150
                },
                plotOptions: {
                    pie: {
                        size: '50%',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} % : {point.y:.2f}',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} % : ({point.y})',

                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                //fontFamily: '\'Lato\', sans-serif',
                                //fontSize: '9px'
                            }
                        }
                    }
                }
            },
            title: {
                text: 'CS KPI Problem Category : ' + summary

            },
            tooltip: {
                //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: 'Value: {point.y:.2f}'
            },

            series: [{
                name: "Brands",
                colorByPoint: true,
                data: datas //$scope.outputCS
            }]
        };

    });

    //-----------------------------------------------------------------
    $http.get("GetHightChartPiePS.aspx")
    .success(function (getdata, status, headers, config) {

        $scope.output = [];
        var OthersSum = 0;
        for (var i = 0; i < getdata.length; i++) {
            if (i < 5) {
                $scope.output.push({
                    name: getdata[i]["KPI_NAME"],
                    y: getdata[i]["CNT"]
                });
            }
            else {
                OthersSum += parseInt(getdata[i]["CNT"]);
            }
        }
        $scope.output.push({
            name: "Others",
            y: OthersSum
        });

        $scope.$broadcast('EVENT_ON_LOADPS', $scope.output);
    })
     .error(function (data, status, headers, config) {
         var x = data
     });
    //--------------------------------------------------------------------------------------
    $scope.PieChartPSChange = function () {
        $scope.PSType = $scope.modelPS;
        $http.get("GetHightChartPiePS.aspx?MobileType=" + $scope.PSType)
        .success(function (getdata, status, headers, config) {
            $scope.output = [];
            var OthersSum = 0;
            for (var i = 0; i < getdata.length; i++) {
                if (i < 5) {
                    $scope.output.push({
                        name: getdata[i]["KPI_NAME"],
                        y: getdata[i]["CNT"]
                    });
                }
                else {
                    OthersSum += parseInt(getdata[i]["CNT"]);
                }
            }
            if (OthersSum != '0') {
                $scope.output.push({
                    name: "Others",
                    y: OthersSum
                });
            }
            //BroadCast from Top To Bottom
            $scope.$broadcast('EVENT_ON_LOADPS', $scope.output);
        })
       .error(function (data, status, headers, config) {
           var x = data
       });
    }
    //--------------------------------------------------------------------------------------

    $scope.$on('EVENT_ON_LOADPS', function (event, datas) {
        var summary = 0;
        for (var i = 0; i < datas.length; i++) {
            summary += datas[i].y;
        }
        $scope.chartConfigPiePS = {
            credits: { enabled: false },
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    margin: [0, 0, 0, 0],
                    spacingTop: 0,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingRight: 0
                    // height: 150
                },
                plotOptions: {
                    pie: {
                        size: '50%',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} % : {point.y:.2f}',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} % : ({point.y})',

                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                //fontFamily: '\'Lato\', sans-serif',
                                //fontSize: '9px'
                            }
                        }
                    }
                }
            },
            title: {
                text: 'PS KPI Problem Category : ' + summary
            },
            tooltip: {
                //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: 'Value: {point.y:.2f}'
            },

            series: [{
                name: "Brands",
                colorByPoint: true,
                data: datas
            }]
        };

    });
    //-----------------------------------------------------------------
    $http.get("GetHightChartProblemCategoryPie.aspx")
       .success(function (getdata, status, headers, config) {
           //var sampleData = [{
           //    name: "Microsoft Internet Explorer",
           //    y: 56.33
           //}, {
           //    name: "Chrome",
           //    y: 24.03,

           //}, {
           //    name: "Firefox",
           //    y: 10.38
           //}, {
           //    name: "Safari",
           //    y: 4.77
           //}, {
           //    name: "Opera",
           //    y: 0.91
           //}, {
           //    name: "Proprietary or Undetectable",
           //    y: 0.2
           //}];
           $scope.output = [];
           $scope.ProblemCatCount = 0;
           for (var i = 0; i < getdata.length; i++) {
               $scope.output.push({
                   name: getdata[i]["Problem Category"],
                   y: getdata[i]["Amount"]
               });
               $scope.ProblemCatCount += getdata[i]["Amount"];
           }

           $scope.$broadcast('EVENT_ON_LOADPIECHART', $scope.output);

       })
    .error(function (data, status, headers, config) {
        var x = data
    });
    //-----------------------------------------------------------------


    //-----------------------------------------------------------------
    $scope.pieChartRegionChange = function () {
        $scope.region = $scope.modelid;
        //alert($scope.region);
        $http.get("GetHightChartProblemCategoryPie.aspx?Region=" + $scope.region)
      .success(function (getdata, status, headers, config) {
          $scope.output = [];
          for (var i = 0; i < getdata.length; i++) {
              $scope.output.push({
                  name: getdata[i]["Problem Category"],
                  y: getdata[i]["Amount"]
              });
          }
          $scope.$broadcast('EVENT_ON_LOADPIECHART', $scope.output);
      })
   .error(function (data, status, headers, config) {
       var x = data
   });

    }

    $scope.$on('EVENT_ON_LOADPIECHART', function (event, datas) {
        var summary = 0;
        for (var i = 0; i < datas.length; i++) {
            summary += datas[i].y;
        }
        $scope.chartConfigProblemCategoryBMAPie = {
            credits: { enabled: false },
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                plotOptions: {
                    pie: {
                        //size:'100%',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} % : {point.y:.2f}',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} % : ({point.y})',

                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                }
            },
            title: {
                //text: 'Problem Category : Backlog ' + $scope.ProblemCatCount + ' cells'
                text: 'Problem Category : Backlog ' + summary + ' cells'

            },
            tooltip: {
                //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: 'Value: {point.y:.2f}'
            },

            series: [{
                name: "Brands",
                colorByPoint: true,
                data: datas,
                point: {
                    events: {
                        click: function (event) {
                            //alert(this.name);
                            $scope.OpenURL = '';
                            if ($scope.modelid == 'NorthEast') { $scope.OpenURL = 'North-East'; }
                            if ($scope.modelid == 'ShoutWest') { $scope.OpenURL = 'South-West'; }
                            if ($scope.modelid == 'CentralEast') { $scope.OpenURL = 'Central-East'; }
                            if ($scope.modelid == 'BMA') { $scope.OpenURL = 'BMA'; }
                            if ($scope.modelid == 'North') { $scope.OpenURL = 'North'; }
                            if ($scope.modelid == 'NationWide') { $scope.OpenURL = 'NationWide'; }

                            window.location = $scope.OpenURL + '.aspx?ProblemCat=' + this.name;
                        }
                    }
                }
            }]
        };

    });
    //------------------------------------------------------------------
    //Load Pie Chart CLosed
    //-----------------------------------------------------------------
    $http.get("GetHightChartProblemCategoryPieClosed.aspx")
       .success(function (getdata, status, headers, config) {
           $scope.output = [];
           $scope.ProblemCatCountClosed = 0;
           for (var i = 0; i < getdata.length; i++) {
               $scope.output.push({
                   name: getdata[i]["Problem Category"],
                   y: getdata[i]["Amount"]
               });
               $scope.ProblemCatCountClosed += getdata[i]["Amount"];
           }

           $scope.$broadcast('EVENT_ON_LOADPIECHARTCLOSED', $scope.output);

       })
    .error(function (data, status, headers, config) {
        var x = data
    });

    $scope.ProblemCateClosedpieChartRegionChange = function () {
        $scope.region = $scope.modelidClosed;
        //alert($scope.region);
        $http.get("GetHightChartProblemCategoryPieClosed.aspx?Region=" + $scope.region)
      .success(function (getdata, status, headers, config) {
          $scope.output = [];
          for (var i = 0; i < getdata.length; i++) {
              $scope.output.push({
                  name: getdata[i]["Problem Category"],
                  y: getdata[i]["Amount"]
              });
          }
          $scope.$broadcast('EVENT_ON_LOADPIECHARTCLOSED', $scope.output);
      })
   .error(function (data, status, headers, config) {
       var x = data
   });

    }


    $scope.$on('EVENT_ON_LOADPIECHARTCLOSED', function (event, datas) {
        var summary = 0;
        for (var i = 0; i < datas.length; i++) {
            summary += datas[i].y;
        }
        $scope.chartConfigProblemCategoryClosedPie = {
            options: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} % : {point.y:.2f}',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} % : ({point.y})',

                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                }
            },
            title: {
                //text: 'Problem Category : Closed ' + $scope.ProblemCatCountClosed + ' cells'
                text: 'Problem Category : Closed ' + summary + ' cells'
            },
            tooltip: {
                //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                pointFormat: 'Value: {point.y:.2f}'
            },

            series: [{
                name: "Brands",
                colorByPoint: true,
                data: datas
            }]
        };

    });



    //------------------------------------------------------------------

    $scope.selectKpiValue = { label: 'Overall', id: '%%' };
    $scope.selectKpiList = [];
    $scope.dataWCL_IM_COUNT_KPIByWeek = {};
    $scope.initializeKpiChart = function () {
        $scope.loadKpiToList();
    }
    $scope.loadKpiToList = function () {
        $http.get("GetData.aspx?action=kpi_list")
        .success(function (data, status, headers, config) {
            //BroadCast from Top To Bottom
            $scope.$broadcast('EVENT_LOAD_FROM_WCL_IM_COUNT_KPI', data);
        });

    }
    $scope.$on('EVENT_LOAD_FROM_WCL_IM_COUNT_KPI', function (event, data) {
        var list = [];
        list.push({ label: 'Overall', id: '%%' });
        for (var i = 0; i < data.length; i++) {
            list.push({ label: data[i].id, id: data[i].id });
        }
        $scope.selectKpiList = list;
        $scope.selectKpiValue = $scope.selectKpiList[0].id;
        $scope.chartKPIChange();   //Load chart.
    });
    $scope.chartKPIChange = function () {
        $http.get("GetData.aspx?action=data_WCL_IM_COUNT_KPI&kpiName=" + $scope.selectKpiValue)
        .success(function (data, status, headers, config) {
            //BroadCast from Top To Bottom
            $scope.$broadcast('EVENT_LOAD_FROM_DATA_WCL_IM_COUNT_KPI', data);
        });
    }
    $scope.$on('EVENT_LOAD_FROM_DATA_WCL_IM_COUNT_KPI', function (event, data) {
        //Get week.
        var lst_week = {};
        var arr_week = [];
        for (var i = 0; i < data.length; i++) {
            if (!(data[i].week.toString() in lst_week)) {
                lst_week[data[i].week.toString()] = data[i].week;
                arr_week.push('WK' + data[i].week.toString());
            }
        }

        //Get name of series.
        var lst_series_name = {};
        for (var i = 0; i < data.length; i++) {
            if (!(data[i].id in lst_series_name)) {
                lst_series_name[data[i].id.toString()] = data[i].id;
            }
        }

        //Check for overall / series more than zero.

        if (Object.keys(lst_series_name).length > 1) {
            //Clear name in id.
            for (var i = 0; i < data.length; i++) {
                data[i].id = data[i].id.split('_')[0];
            }


            //Sum data into dataTemp and swap them.
            var dictData = {};
            var dataTemp = [];
            for (var i = 0; i < data.length; i++) {
                var key = data[i].id + '_' + data[i].week;
                if (!dictData[key]) dictData[key] = { id: data[i].id, value: 0, week: data[i].week };
                dictData[key].value += data[i].value;
            }
            for (var objKey in dictData) {
                dataTemp.push(dictData[objKey]);
            }
            data = dataTemp;



            //Clear list of data for new name of series.
            lst_series_name = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].id in lst_series_name)) {
                    lst_series_name[data[i].id.toString()] = data[i].id;
                }
            }
        }

        //Get series from data.
        var lst_series = [];
        for (var serie_name in lst_series_name) {
            var serie_obj = { name: serie_name };

            var arr_data = [];
            for (var week in lst_week) {
                var found = false;
                var value = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == serie_name && data[i].week.toString() == week) {
                        found = true;
                        value = data[i].value;
                        break;
                    }
                }

                if (found != null) arr_data.push(value); else arr_data.push(null);
            }
            serie_obj.data = arr_data;
            lst_series.push(serie_obj);
        }
        if (lst_series.length > 0) {
            lst_series[0].borderRadiusTopLeft = 15;
            lst_series[0].borderRadiusTopRight = 15;
        }


        $scope.dataWCL_IM_COUNT_KPIByWeek = {
            credits: { enabled: false },
            options: {
                chart: {
                    type: 'column'
                },
                legend: {
                    align: 'center',
                    x: 30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false,
                    enabled: true
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                }
            },
            series: lst_series,
            title: {
                text: 'Worst Cell Statistic per System / KPIs'
            },
            xAxis: {
                categories: arr_week
            },
            yAxis: {

                title: {
                    text: 'Number of IM'
                }
            },
            loading: false
        };
    });
    $scope.initializeKpiChart();


    $scope.chartConfig = {};
}]);