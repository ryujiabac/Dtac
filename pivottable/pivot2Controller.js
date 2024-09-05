angular.module('worstcellApp')


.controller('Pivot2Controller', function ($scope, $http, $window, $rootScope,
        $mdDialog, $mdMedia, $mdSidenav,
        uiGridConstants,
        leafletData, leafletBoundsHelpers, leafletMapEvents) {

    $scope.getExportCsvFileName = function (title) {
        return title.replace(':', '_').replace('.', '_').replace('/', '_').replace('\\', '_').replace(' ', '_') + '_' + Math.floor(Date.now() / 1000) + '.csv';
    }
    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };

    /**
     * Return a colDefs array for use with ng-grid "gridOptions". Work around for
     * "auto" width not working in ng-grid. colDefs array will have percentage
     * widths added. Pass in an object which is a single row of your data! This
     * function does not do typeface width! Use a fixed width font. Pass in an
     * existing colDefs array and widths will be added!
     */
    $scope.autoColWidth = function(colDefs, row) {
        var totalChars = 0;
        for (var colName in row) {
            // Convert numbers to strings here so length will work.
            totalChars += (new String(row[colName])).length;
        }
        colDefs.forEach(function (colDef) {
            var numChars = (new String(row[colDef.field])).length;
            colDef.width = (numChars / totalChars * 100) + "%";
        });
        return colDefs;
    }
    /**
     * Create a colDefs array for use with ng-grid "gridOptions". Pass in an object
     * which is a single row of your data!
     */
    $scope.makeColDefs = function(row) {
        var colDefs = [];
        for (var colName in row) {
            colDefs.push({
                'field': colName
            });
        }
        return colDefs;
    }

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };



    $scope.defineForSelectType = function (colOption, data) {
        var dictData = {};
        var arrData = [];
        var selData = [];
        for (var i = 1; i < data.length; i++) {
            var key = data[i][colOption.field];
            if (!dictData[key]) dictData[key] = '';
        }
        for (var key in dictData) {
            arrData.push(key);
        }
        arrData.sort();
        for (var i = 0; i < arrData.length;i++) {
            selData.push({ value: arrData[i], label: arrData[i] });
        }
        colOption.filter = { term: '', type: uiGridConstants.filter.SELECT, selectOptions: selData };
        //colOption.cellFilter = colName;
        //colOption.headerCellClass = $scope.highlightFilteredHeader;
    }

    $scope.fixedForValue = function (val) {
        var numFixed = 3;
        if(angular.isNumber(val) && val.toString().indexOf('.') > -1 && val.toString().split('.')[1] > numFixed){
            return Number(val.toFixed(3));
        }
        return val;
    }

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };







        



    $scope.isLoadData = false;
    $scope.$on('grid.load.joinWith_WC_E3G_HO_ADJ_NAME_JsonData', function ($event, data) {
        $scope.isLoadData = false;
        $scope.setUpGrid(data);
    });


    
    $scope.loadJoinWith_WC_E3G_HO_ADJ_NAME_JsonData = function (E3GCSDrop, PE3GNeighborHODropDis) {
        $scope.isLoadData = true;
        var url = "../View_V_WC_E3G_CS_CAUSE_OF_DROP_DY_Page.aspx?action=join_with_WC_E3G_HO_ADJ_NAME&E3GCSDrop={0}&PE3GNeighborHODropDis={1}&".format(E3GCSDrop, PE3GNeighborHODropDis);
        $http.post( url,
           {})
          .success(function (targetData, status, headers, config) {
              $rootScope.$broadcast('grid.load.joinWith_WC_E3G_HO_ADJ_NAME_JsonData', targetData);
          })
       .error(function (data, status, headers, config) {
           $mdDialog.alert()
             .clickOutsideToClose(true)
             .title('Alert! Load data error.')
             .textContent('Cannot load neighbor cell data.')
             .ariaLabel('Alert Dialog Demo')
             .ok('Got it!')
       });
        
    }
    $scope.init = function () {


        var d = new Date();
        var n = d.getDate();
        $scope.gridOptions = {
            enableFiltering: true,
            enableGridMenu: true,
            enableColumnResizing: true,
            enableSelectAll: true,
            showGridFooter: true,
            showColumnFooter: true,
            exporterMenuPdf: false,
            exporterCsvFilename: $scope.getExportCsvFileName('WC_E3G_HO_ADJ_NAME'),
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            //gridMenuCustomItems: [
            //      {
            //          title: 'Show on Map',
            //          action: function ($event) {
            //              $scope.showNeighborCellMapDialog($event);
            //              //$window.alert($scope.gridApi.selection.getSelectedRows());
            //          },
            //          order: 100
            //      }
            //]
        };

        $scope.loadJoinWith_WC_E3G_HO_ADJ_NAME_JsonData(g_E3GCSDrop, g_PE3GNeighborHODropDis);
    }

    $scope.setUpGrid = function (data) {



        var columnDefsObj = $scope.makeColDefs(data[0]);
        var columnWidths = [
            160, 150, 150, 150, 150, 150, 150, 150, 150, 150,
            160, 150, 150, 150, 150, 150, 150, 150, 150, 150,
            160, 150, 150, 150, 150, 150, 150, 150, 150, 150
        ];
        var columnTypes = [
            '', '', '', '', '', '', '', 'number', 'number', 'number',
            'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number',
            'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'
        ];
        for (var i = 0; i < columnDefsObj.length; i++) {
            if (i < columnWidths.length) {
                columnDefsObj[i].minWidth = columnWidths[i];
                columnDefsObj[i].width = columnWidths[i];
            }
            if (i < columnTypes.length) {
                columnDefsObj[i].type = columnTypes[i];
                if (columnTypes[i] == 'number') {
                        columnDefsObj[i].aggregationType = uiGridConstants.aggregationTypes.sum;
                        columnDefsObj[i].aggregationHideLabel = true;

                        for (var j = 0; j < data.length; j++) {
                            data[j][columnDefsObj[i].field] = $scope.fixedForValue(data[j][columnDefsObj[i].field]);
                        }
                }
            }
        }
        $scope.defineForSelectType(columnDefsObj[0], data);
        $scope.defineForSelectType(columnDefsObj[1], data);
        $scope.defineForSelectType(columnDefsObj[2], data);
        $scope.defineForSelectType(columnDefsObj[3], data);
        $scope.defineForSelectType(columnDefsObj[4], data);
        $scope.defineForSelectType(columnDefsObj[5], data);

        //columnDefsObj[7].cellTemplate = '<button class="btn primary" ng-click="grid.appScope.showMe()">{{row.entity.RNC}}</button>';





        //$scope.autoColWidth(columnDefsObj, data[0]);
        $scope.gridOptions.columnDefs = columnDefsObj;
        $scope.gridOptions.data = data;

    }



    $scope.init();





})
