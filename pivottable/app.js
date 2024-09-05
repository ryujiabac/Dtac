// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

angular.module('worstcellApp', ['ngMaterial',
    'highcharts-ng',
    'frapontillo.gage',
    'leaflet-directive',
    'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.resizeColumns', 'ui.grid.moveColumns'])

.controller('MainCtrl', function ($scope, $http, $window, $rootScope, $log,
        $mdDialog, $mdMedia, $mdSidenav,
        uiGridConstants,
        leafletData, leafletBoundsHelpers, leafletMapEvents, leafletMarkerEvents) {


        $scope.E3GCSDrop = 20;
        $scope.PE3GNeighborHODropDis = 50;


        var today = new Date();
        var nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
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
        $scope.gridOptions = {
            enableFiltering: true,
            enableGridMenu: true,
            enableColumnResizing: true,            
            enableSelectAll: true,
            //showGridFooter: true,
            showColumnFooter: true,
            exporterMenuPdf: false,
            exporterCsvFilename: $scope.getExportCsvFileName('worstcell_data'),
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            },
            gridMenuCustomItems: [
                  {
                      title: 'Show on Map',
                      action: function ($event) {
                          $scope.showNeighborCellMapDialog($event);
                          //$window.alert($scope.gridApi.selection.getSelectedRows());
                      },
                      order: 100
                  },
                  {
                      title: 'All Cells',
                      action: function ($event) {
                          var url = "Privot2.aspx?E3GCSDrop={0}&PE3GNeighborHODropDis={1}&".format($scope.E3GCSDrop, $scope.PE3GNeighborHODropDis);
                          $window.open(url);
                          //$window.alert($scope.gridApi.selection.getSelectedRows());
                      },
                      order: 200
                  },
            ]
        };

        $scope.isLoadData = false;
        $scope.data = [];
        $scope.loadData = function () {
            $scope.isLoadData = true;
            $scope.gridOptions.data = [];
            var url = "../View_V_WC_E3G_CS_CAUSE_OF_DROP_DY_Page.aspx?action=MAIN_V_WC_E3G_CS_CAUSE_OF_DROP_DY&E3GCSDrop={0}&PE3GNeighborHODropDis={1}&".format($scope.E3GCSDrop, $scope.PE3GNeighborHODropDis);
            $http.get(url)
              .success(function (data) {
                  $scope.data = data;
                  $rootScope.$broadcast('grid.load.v_wc_e3g_cs_cause_of_drop_dy', data);
              });
        }
        $scope.$on('grid.load.v_wc_e3g_cs_cause_of_drop_dy', function ($event, data) {
            $scope.isLoadData = false;

            if (data.length == 0) return;

            var latitudeField = 'LAT';
            var longitudeField = 'LONG';

            var columnDefsObj = $scope.makeColDefs(data[0]);
            var columnWidths = [
                160, 180, 150, 150, 150, 150, 180, 150, 150, 150,
                160, 150, 150, 150, 150, 150, 150, 150, 150, 150,
                160, 150, 150, 150, 150, 150, 150, 150, 150, 150
            ];
            var columnTypes = [
                '', '', '', '', '', '', '', '', '', '',
                'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number',
                'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'
            ];
            var columnFixed = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
                0, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 0, 2, 2, 2, 2, 2
            ];
            var columnAggregationTypes = [
                'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg',
                'avg', 'sum', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg',
                'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg', 'avg'
            ];
            var columnHides = ['LAT', 'LONG', 'AZIMUTH'];
            for (var i = 0; i < columnDefsObj.length; i++) {
                if (i < columnWidths.length) {
                    columnDefsObj[i].minWidth = columnWidths[i];
                    columnDefsObj[i].width = columnWidths[i];
                    columnDefsObj[i].type = columnTypes[i];
                    if (columnTypes[i] == 'number') {
                        if (columnDefsObj[i].field != latitudeField && columnDefsObj[i].field != longitudeField) {
                            columnDefsObj[i].aggregationType = uiGridConstants.aggregationTypes.sum;
                            switch (columnAggregationTypes[i]) {
                                case 'avg':
                                    columnDefsObj[i].aggregationType = uiGridConstants.aggregationTypes.avg;
                                    columnDefsObj[i].footerCellTemplate = '<div class="ui-grid-cell-contents" style="font-size:14px;text-align:right"><span style="text-decoration:overline;float:left"><i>a</i></span> {{col.getAggregationValue().toFixed({0})}}</div>'.format(columnFixed[i]);
                                    break;
                                case 'sum':
                                   default:
                                    columnDefsObj[i].aggregationType = uiGridConstants.aggregationTypes.sum;
                                    columnDefsObj[i].footerCellTemplate = '<div class="ui-grid-cell-contents" style="font-size:14px;text-align:right"><span style="float:left">&#8721;</span> {{col.getAggregationValue().toFixed({0})}}</div>'.format(columnFixed[i]);
                                    break;
                            }
                            columnDefsObj[i].aggregationHideLabel = true;
                            columnDefsObj[i].cellTemplate = '<div class="ui-grid-cell-contents" style="text-align:right">{{row.entity[col.field].toFixed({0})}}</div>'.format(columnFixed[i]);
                            
                            //for (var j = 0; j < data.length; j++) {
                            //    data[j][columnDefsObj[i].field] = $scope.fixedForValue(data[j][columnDefsObj[i].field]);
                            //}
                        }
                    }
                }
                if (columnHides.indexOf(columnDefsObj[i].field) > -1) {
                    columnDefsObj[i].visible = false;
                }
            }
            if (data.length > 0) {
                $scope.defineForSelectType(columnDefsObj[0], data);
                $scope.defineForSelectType(columnDefsObj[1], data);
                $scope.defineForSelectType(columnDefsObj[2], data);
                $scope.defineForSelectType(columnDefsObj[3], data);
                $scope.defineForSelectType(columnDefsObj[4], data);
            }
            columnDefsObj[6].cellTemplate = '<div class="ui-grid-cell-contents"><a href="#" ng-click="grid.appScope.loadNeighborCellMapping($event, [ row.entity ])"><img src="images/icons/map.png" alt="View on Map" border="0" /></a>&nbsp;{{row.entity.UtranCell}}</div>';





            //$scope.autoColWidth(columnDefsObj, data[0]);
            $scope.gridOptions.columnDefs = columnDefsObj;
            $scope.gridOptions.data = data;

            //$scope.toggleRight = buildToggler('right');
            //$scope.toggleRight.open();
        });

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
            if(angular.isNumber(val)){
                return Number(val.toFixed(3));
            } else if(val == null) {
                return val;
            } else {
                return val;
            }
            return val;
        }

        $scope.toggleFiltering = function () {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };

        $scope.redirect = function (url) {
            $window.location.href = url;
        }

        $scope.init = function () {
            //var arrParams = $window.location.search.substring(1).split('&');
            //for (var i = 0; i < arrParams.length; i++) {
            //    if (arrParams[i].indexOf('=') > -1) {
            //        var arrSub = arrParams[i].split('=');
            //        $scope[arrSub[0]] = arrSub[1];
            //    }
            //}


            $scope.loadData();

            $scope.guage100 = {
                levelColors : [
                    "#ff0000", "#ff0000", "#00ff00"
                ],
                customSectors : [
                {
                    color: "#ff0000",
                    lo: 0,
                    hi: 30
                },
                {
                    color: "#ff0000",
                    lo: 30,
                    hi: 99
                },
                {
                    color: "#00ff00",
                    lo: 99,
                    hi: 100
                }
                ]
            };
            $scope.guage000 = {
                levelColors: [
                    "#00ff00", "#ff0000", "#ff0000"
                ],
                customSectors: [
                {
                    color: "#00ff00",
                    lo: 0,
                    hi: 50
                },
                {
                    color: "#ff0000",
                    lo: 50,
                    hi: 80
                },
                {
                    color: "#ff0000",
                    lo: 60,
                    hi: 100
                }
                ]
            };
 
        }



        $scope.init();






        



    
        $scope.showNeighborCellMapDialog = function ($event) {
            var data = $scope.gridApi.selection.getSelectedRows();
            $scope.loadNeighborCellMapping($event, data);
        }
        $scope.loadNeighborCellMapping = function ($event, data) {
            if (data.length > 0) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/map.html',
                    targetEvent: $event,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    scope: $scope,
                    preserveScope: true,
                    openFrom: {
                        left: 1500,
                        width: 100,
                        height: 100
                    },
                    closeTo: {
                        left: 1500,
                        width: 100,
                        height: 100
                    }
                });

                $scope.loadNeighborCellsJsonData(data); //Load cell data.
            }
        }
        $scope.setUpForMap = function (data) {
            var latitudeField = 'LAT';
            var longitudeField = 'LONG';
            var messageField = 'UtranCell';
            var rotateField = 'AZIMUTH';
            $scope.worstCellMap = { data: data };

            var icons = {
                blue: {
                    type: 'div',
                    iconSize: [12, 12],
                    className: 'blue',
                    iconAnchor: [6, 6]
                }
            }


            angular.extend($scope.worstCellMap, {
                bounds: null,
                markers: {},
                layers: {
                    baselayers: {
                        googleRoadmap: {
                            name: 'Google Streets',
                            layerType: 'ROADMAP',
                            type: 'google'
                        },
                        googleTerrain: {
                            name: 'Google Terrain',
                            layerType: 'TERRAIN',
                            type: 'google'
                        },
                        googleHybrid: {
                            name: 'Google Hybrid',
                            layerType: 'HYBRID',
                            type: 'google'
                        }

                    }
                }
            });

            //Add markers & set bounds.
            var bounds = [];
            var minLat = null, minLng = null, maxLat = null, maxLng = null;





            //For neighbor cells.
            for (var i = 0; i < data.neighborCells.length; i++) {
                var lat = data.neighborCells[i][latitudeField];
                var lng = data.neighborCells[i][longitudeField];
                var pCell_Avail = data.neighborCells[i]['pCell_Avail'];

 
                    var key = 'q' + i;
                    $scope.worstCellMap.markers[key] = {
                        lat: lat,
                        lng: lng,
                        focus: false,
                        opacity: 0.6,
                        //message: data.neighborCells[i][messageField],
                        iconAngle: data.neighborCells[i][rotateField],
                        icon: {
                            iconUrl: 'images/icons/cell_blue.png',
                            iconSize: [16, 16], // size of the icon
                            iconAnchor: [8, 16],  // the same for the shadow
                        },
                        data: data.neighborCells[i],
                    };


                //$scope.worstCellMap.markers['x' + key] = {
                //    lat: lat,
                //    lng: lng,

                //    message: data.neighborCells[i][messageField],

                //};

                
                if (pCell_Avail == 100) {
                    $scope.worstCellMap.markers[key].icon.iconUrl = 'images/icons/cell_green.png';
                //} else if (pCell_Avail >= 80) {
                //    $scope.worstCellMap.markers[key].icon.iconUrl = 'images/icons/cell_green.png';
                //} else if (pCell_Avail >= 60) {
                //    $scope.worstCellMap.markers[key].icon.iconUrl = 'images/icons/cell_yellow.png';
                //} else if (pCell_Avail >= 0) {
                //    $scope.worstCellMap.markers[key].icon.iconUrl = 'images/icons/cell_red.png';
                } else {
                    $scope.worstCellMap.markers[key].icon.iconUrl = 'images/icons/cell_red.png';
                }

                //Find min/max - latitude,longitude.
                if (minLat == null) minLat = lat; else if (lat < minLat) minLat = lat;
                if (maxLat == null) maxLat = lat; else if (lat > maxLat) maxLat = lat;
                if (minLng == null) minLng = lng; else if (lng < minLng) minLng = lng;
                if (maxLng == null) maxLng = lng; else if (lng > maxLng) maxLng = lng;
            }



            //For cells.
            for (var i = 0; i < data.cells.length; i++) {
                var lat = data.cells[i][latitudeField];
                var lng = data.cells[i][longitudeField];
                var pCell_Avail = data.cells[i]['pCell_Avail'];
                var key = 'p' + i;

                $scope.worstCellMap.markers[key] = {
                    lat: lat,
                    lng: lng,
                    focus: false,
                    //message: data.neighborCells[i][messageField],
                    icon: icons.blue,
                    data: data.cells[i]
                };

                $scope.worstCellMap.markers["current"] = {
                    lat: lat,
                    lng: lng,
                    focus: false,
                    opacity: 0.6,
                    //message: data.neighborCells[i][messageField],
                    iconAngle: data.cells[i][rotateField],
                    icon: {
                        iconUrl: pCell_Avail == 100 ? 'images/icons/cell_green.png' : 'images/icons/cell_red.png',
                        iconSize: [32, 32], // size of the icon
                        iconAnchor: [16, 32],  // the same for the shadow
                    },
                    data: data.cells[i],
                };


                //Find min/max - latitude,longitude.
                if (minLat == null) minLat = lat; else if (lat < minLat) minLat = lat;
                if (maxLat == null) maxLat = lat; else if (lat > maxLat) maxLat = lat;
                if (minLng == null) minLng = lng; else if (lng < minLng) minLng = lng;
                if (maxLng == null) maxLng = lng; else if (lng > maxLng) maxLng = lng;

                if (i == 0) {
                    $scope.worstCellMap.selectedMaker = { model: $scope.worstCellMap.markers[key] };
                }
            }

            //Set bound of map.
            if (minLat != null && minLng != null & maxLat != null & maxLng != null)
                $scope.worstCellMap.bounds = leafletBoundsHelpers.createBoundsFromArray([[minLat, minLng], [maxLat, maxLng]]);




        }
        

        $scope.$on('map.load.v_wc_e3g_cs_cause_of_drop_dy', function ($event, data) {
            $scope.worstCellMap_isLoadData = false;
            $scope.setUpForMap(data);
            
            //$scope.toggleRight = buildToggler('right');
            //$scope.toggleRight.open();
        });
        $scope.loadNeighborCellsJsonData = function (sourceData) {
            $scope.worstCellMap_isLoadData = true;
            $http.post("../View_V_WC_E3G_CS_CAUSE_OF_DROP_DY_Page.aspx?action=v_wc_e3g_cs_cause_of_drop_dy",
               { cellList: sourceData })
              .success(function (targetData, status, headers, config) {
                  $rootScope.$broadcast('map.load.v_wc_e3g_cs_cause_of_drop_dy', { cells: sourceData, neighborCells: targetData });
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
        $scope.getCellsBySite = function (cells, siteId) {
            var listOfCells = [];
            for (var i = 0; i < cells.length; i++) {
                var str = siteId.split('-')[0];
                if (cells[i].SITE_ID.indexOf(str) > -1) {
                    listOfCells.push(cells[i]);
                }
            }
            return listOfCells;
        }



        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                  .toggle()
                  .then(function () {
                      $log.debug("toggle " + navID + " is done");
                  });
            }
        }
        $scope.toggleRight = buildToggler('right');

        $scope.$on('leafletDirectiveMarker.click', function (event, args) {
            $scope.worstCellMap.selectedMaker = args;


            //var data = worstCellMap.selectedMaker.model.data;
            //var lat = data['LAT'];
            //var lng = data['LON'];
            //var pCell_Avail = data.cells[i]['pCell_Avail'];
            //$scope.worstCellMap.markers["current"] = {
            //    lat: lat,
            //    lng: lng,
            //    focus: false,
            //    opacity: 0.6,
            //    //message: data.neighborCells[i][messageField],
            //    iconAngle: data[rotateField],
            //    icon: {
            //        iconUrl: pCell_Avail == 100 ? 'images/icons/cell_green.png' : 'images/icons/cell_red.png',
            //        iconSize: [32, 32], // size of the icon
            //        iconAnchor: [16, 32],  // the same for the shadow
            //    },
            //    data: data,
            //};

            //$scope.toggleRight('right');
        });

        //var markerEvents = leafletMarkerEvents.getAvailableEvents();
        //for (var k in markerEvents) {
        //    var eventName = 'leafletDirectiveMarker.' + markerEvents[k];
        //    $scope.$on(eventName, function (event, args) {
        //        if (markerEvents[k] == 'click') {
        //            var i = 0;
        //        }
        //        $scope.eventDetected = event.name;
        //    });
        //}

})


function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}