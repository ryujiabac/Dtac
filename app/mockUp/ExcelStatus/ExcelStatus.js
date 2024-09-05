angular.module('mockup', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.rowEdit'
                     , 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns'])
.controller("mockup.excelStatus",
['$scope', '$window', '$http', '$log', '$timeout', 'uiGridConstants', function ($scope, $window, $http, $log, $timeout, uiGridConstants) {

    $scope.EditGridData = [];
    $scope.DeleteGridData = [];
    $scope.msg = {};
    $scope.loginName = $('.hiddenLoginName').val();
    $scope.solutionData = [];
    $scope.gridOptions1 = {};
    $scope.gridOptions1 = { enableRowSelection: true, enableRowHeaderSelection: false, enableSelectAll: true, showGridFooter: true };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;

    $scope.gridOptions2 = {};
    $scope.gridOptions2 = { enableRowSelection: true, enableRowHeaderSelection: false, enableSelectAll: true, showGridFooter: true };
    $scope.gridOptions2.multiSelect = true;
    $scope.gridOptions2.modifierKeysToMultiSelect = false;
    $scope.gridOptions2.noUnselect = true;

    $scope.gridOptions1 = {
        // enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
           //{ displayName: 'CODENAME', field: 'CODENAME', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'File', field: 'IMPORT_FILE_NAME', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },


          { displayName: 'Time', field: 'DATE_IMPORT_New', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Progress', field: 'PROGRESS', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Row', field: 'ROW', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Completed', field: 'COMPLETE', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          //{ displayName: 'Hit Type', field: 'TypeOfHit', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          //{ displayName: 'RAN Status', field: 'RAN_REMARK', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          //{ displayName: 'CR Number', field: 'CR_NUMBER', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          //{ displayName: 'Problem Category', field: 'PROBLEM_CAT', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },
          //{ displayName: 'Week Count', field: 'countday_wcwk', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 90 },


        ]
    };
    $scope.gridOptions2 = {
        // enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
          { displayName: 'File', field: 'IMPORT_FILE_NAME', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Time', field: 'DATE_IMPORT_New', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Progress', field: 'PROGRESS', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Row', field: 'ROW', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
          { displayName: 'Completed', field: 'COMPLETE', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 90 },
        ]
    };


    $scope.gridOptions1.enableGridMenu = false;
    $scope.gridOptions1.enableColumnResizing = true;
    $scope.gridOptions1.enableFiltering = true;
    $scope.gridOptions1.fastWatch = true;
    $scope.enableRowSelection = true;
    $scope.gridOptions1.enableRowHeaderSelection = false;
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;

    $scope.gridOptions2.enableGridMenu = false;
    $scope.gridOptions2.enableColumnResizing = true;
    $scope.gridOptions2.enableFiltering = true;
    $scope.gridOptions2.fastWatch = true;
    $scope.enableRowSelection = true;
    $scope.gridOptions2.enableRowHeaderSelection = false;
    $scope.gridOptions2.multiSelect = true;
    $scope.gridOptions2.modifierKeysToMultiSelect = false;
    $scope.gridOptions2.noUnselect = true;

    $http.post("WebServiceMockUp.asmx/GetExcelStatus",
        { userName: $scope.loginName })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.gridOptions1.data = obj;

    })
    .error(function (data, status, headers, config) {
        var x = data
    });

    $http.post("WebServiceMockUp.asmx/GetExcelStatusComplete",
       { userName: $scope.loginName })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
   .success(function (data, status, headers, config) {
       var obj = JSON.parse(data.d);
       $scope.gridOptions2.data = obj;

   })
   .error(function (data, status, headers, config) {
       var x = data
   });

}
]);