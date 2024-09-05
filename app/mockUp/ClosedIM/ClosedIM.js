var app = angular.module('mockup', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.rowEdit'
                        , 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'highcharts-ng'])

app.controller("ClosedIMCtrl", ['$scope', '$window', '$http', '$log', '$timeout', 'uiGridConstants', function ($scope, $window, $http, $log, $timeout, uiGridConstants) {
    $scope.region = 'NationWide'
    $scope.gridOptions1 = {};
    $scope.gridOptions1 = { enableRowSelection: true, enableRowHeaderSelection: false, enableSelectAll: true, showGridFooter: true };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;



    $scope.gridOptions1 = {
        // enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [

           {
               displayName: 'IM Id', field: 'IM', headerCellClass: 'headerCenter', type: 'date', enableFiltering: true, minWidth: 100,
               cellTooltip: function (row, col) {
                   return 'IM: ' + row.entity.IM + '\n' +
                          'Week: ' + row.entity.WK + '\n' +
                          'Region: ' + row.entity.REGION
               }//, cellTemplate: '<button class="btn" value="Edit" style="width:100%;"  ng-click="grid.appScope.ShowUpdateForm(row)">{{COL_FIELD}}</button>'
           },
           {
               displayName: 'Week', field: 'WK', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 50,
               cellTooltip: function (row, col) {
                   return 'IM: ' + row.entity.IM + '\n' +
                           'Week: ' + row.entity.WK + '\n' +
                           'Region: ' + row.entity.REGION + '\n' +
                           'RAN Status: ' + row.entity.RAN_STATUS + '\n' +
                           'IM_FO: ' + row.entity.IM_FO + '\n' +
                           'Program category: ' + row.entity.PROBLEM_CAT + '\n' +
                           'Short-term solution: ' + row.entity.SHORT_TERM_SOLUTION + '\n' +
                           'CR Number: ' + row.entity.CR_NUMBER + '\n' +
                           'CR Status: ' + row.entity.CR_STATUS + '\n' +
                           'Target Short-Term: ' + row.entity.SHORT_TERM_TARGET_WK + '\n' +
                           'Long-Term solution: ' + row.entity.LONG_TERM_SOLUTION + '\n' +
                           'Long-Term status: ' + row.entity.LONG_TERM_SOLUTION_STATUS + '\n' +
                           'Target Long-Term: ' + row.entity.LONG_TERM_TARGET_MONTH + '\n' +
                           'Remark: ' + row.entity.REMARK
               }
           },
           { displayName: 'Week Count', field: 'WC_COUNT', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 50 },
           { displayName: 'Region', field: 'REGION', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 100 },

           { displayName: 'Site Code', field: 'sitecode', headerCellClass: 'headerCenter', cellClass: 'gridCellStyle', enableFiltering: true, minWidth: 90 },
            { displayName: 'Site name', field: 'sitecodeeng', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 150 },
           //{ displayName: 'Site Eng', field: 'sitecodeeng', headerCellClass: 'headerCenter', cellClass: 'gridCellStyle', enableFiltering: true, minWidth: 90 },
          { displayName: 'Cell Id', field: 'cellName', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 130 },
          //{ displayName: 'Cell Name', field: 'NAME_T', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          { displayName: 'KPI Name', field: 'KPI_NAME', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 230 },
          { displayName: '% KPI Value', field: 'pKPI_WCWK', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90, type: 'number' },
          { displayName: 'Hit Type', field: 'TypeOfHit', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          { displayName: 'Problem Category', field: 'PROBLEM_CAT', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 110 },
          { displayName: 'Short Term Solution', field: 'SHORT_TERM_SOLUTION', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 120 },
          { displayName: 'Target ST', field: 'SHORT_TERM_TARGET_WK', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 80 },
          { displayName: 'Long Term Solution', field: 'LONG_TERM_SOLUTION', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          { displayName: 'Target LT', field: 'LONG_TERM_TARGET_MONTH', headerCellClass: 'headerCenter', minWidth: 90 },
          //{ displayName: 'Week Count', field: 'wc_count', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90, type: 'number' },

        //{ displayName: 'NoKpi', field: 'NoKpi', headerCellClass: 'headerCenter', cellTemplate: "<div style='text-align:center;'><img style='width:20px;height:20px' ng-src='{{grid.appScope.getImage(COL_FIELD)}}' /></div>" }
        //  { displayName: '3G', field: 'cell3G', headerCellClass: 'headerCenter', cellTemplate: "<div style='text-align:center;'><img style='width:20px;height:20px' ng-src='{{grid.appScope.getImage(COL_FIELD)}}' /></div>" },
        //  { displayName: '4G', field: 'cell4G', headerCellClass: 'headerCenter', cellTemplate: "<div style='text-align:center;'><img style='width:20px;height:20px' ng-src='{{grid.appScope.getImage(COL_FIELD)}}' /></div>" },
        //  { displayName: 'Wifi', field: 'cellWifi', headerCellClass: 'headerCenter', cellTemplate: "<div style='text-align:center;'><img style='width:20px;height:20px' ng-src='{{grid.appScope.getImage(COL_FIELD)}}' /></div>" },
        // { displayName: 'Readiness', field: 'readiness', headerCellClass: 'headerCenter', cellTemplate: "<div style='text-align:center;'><img style='width:20px;height:20px' ng-src='{{grid.appScope.getImage(COL_FIELD)}}' /></div>" }
        ]
    }

    $scope.gridOptions1.enableGridMenu = false;
    $scope.gridOptions1.enableColumnResizing = true;
    $scope.gridOptions1.enableFiltering = true;
    $scope.gridOptions1.fastWatch = true;
    $scope.enableRowSelection = true;
    $scope.gridOptions1.enableRowHeaderSelection = false;
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;


    $http.post("WebServiceMockUp.asmx/GetClosedIM",
     { Region: 'NationWide' })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
     .success(function (data, status, headers, config) {
         $('.loadingIconNew').css('display', 'block');
         var obj = JSON.parse(data.d);
         $scope.gridOptions1.data = obj;
     })
     .error(function (data, status, headers, config) {
         var x = data
     })
     .finally(function () {
         $('.loadingIconNew').css('display', 'none');
     });

    $scope.BindGrid = function (region) {
        $http.post("WebServiceMockUp.asmx/GetClosedIM",
     { Region: region })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
     .success(function (data, status, headers, config) {
         $('.loadingIconNew').css('display', 'block');
         $scope.region = region;
         var obj = JSON.parse(data.d);
         $scope.gridOptions1.data = obj;
     })
     .error(function (data, status, headers, config) {
         var x = data
     })
     .finally(function () {
         $('.loadingIconNew').css('display', 'none');
     });
    }

}]);