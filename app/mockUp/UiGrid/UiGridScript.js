var app = angular.module('mockup', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.rowEdit'
                        , 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'highcharts-ng'])

app.controller("mockup.north", ['$scope', '$window', '$http', '$log', '$timeout', 'uiGridConstants', function ($scope, $window, $http, $log, $timeout, uiGridConstants) {

    $scope.Week = "";
    $scope.SiteCode = "";
    var TotalKpiFormat = "";

    var arrIM = [];


    var KPICount2G = "";
    var KPICount3G = "";
    var KPICount4G = "";

    $scope.OverDue = "";
    $scope.selectedOption = "";

    $scope.dataJsonBMA = {};
    $scope.mockStatus = "New";

    //$scope.region = "North";
    //North ไม่มี เอา BMA 
    $scope.region = $('.hiddenRegion').val();//This hidden field is located in .aspx by each region

    $scope.userName = '';
    $scope.loginName = $('.hiddenLoginName').val();//this hidden field is located in MasterPage.
    $scope.KnowIssue = $('.hiddenKnowIssue').val();//This hidden-field located in .aspx by each region
    $scope.ClosedIM = $('.hiddenClosedIM').val();//This hidden-field located in .aspx by each region
    $scope.CellAvailability = $('.hiddenCellAvailability').val();
    $scope.ProblemCat = $('.hiddenProblemCat').val(); // get Hidden Problem Cat from .aspx


    $scope.userPermission = '';

    $scope.startFrom = "";
    $scope.finishDate = "";
    $scope.search = "";

    $scope.TotalKPI = [];
    $scope.ShowRemark = [];

    $scope.EditGridData = [];
    $scope.DeleteGridData = [];
    $scope.msg = {};
    $scope.solutionData = [];
    $scope.gridOptions1 = {};
    $scope.gridOptions1 = { enableRowSelection: true, enableRowHeaderSelection: false, enableSelectAll: true, showGridFooter: true };
    $scope.gridOptions1.multiSelect = true;
    $scope.gridOptions1.modifierKeysToMultiSelect = false;
    $scope.gridOptions1.noUnselect = true;

    $scope.gridOptions3 = {};
    $scope.gridOptions3 = { enableSelectAll: true };
    $scope.gridOptions3.multiSelect = false;
    $scope.gridOptions3.modifierKeysToMultiSelect = false;
    $scope.gridOptions3.noUnselect = false;

    $scope.gridOptions4 = {};
    $scope.gridOptions4 = { enableSelectAll: true };
    $scope.gridOptions4.multiSelect = false;
    $scope.gridOptions4.modifierKeysToMultiSelect = false;
    $scope.gridOptions4.noUnselect = false;


    $scope.ranstatus = "";

    $scope.$on('ranStatus', function (event, data) {
        $scope.ranstatus = data[0];
    });

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
               }, cellTemplate: '<button class="btn" value="Edit" style="width:100%;"  ng-click="grid.appScope.ShowUpdateForm(row)">{{COL_FIELD}}</button>'
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
    };


    $scope.gridOptions3 = {
        // enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [

         { displayName: 'Time', field: 'DATETIME_ID_New', enableFiltering: true, minWidth: 500, rowHeight: 500 },
         {
             displayName: 'Remark', field: 'REMARK', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 500, rowHeight: 500,
             cellTemplate: '<textarea style="width:350px; overflow: scroll;">{{COL_FIELD}}</textarea>'
         },
         { displayName: 'Remark By', field: 'LOGIN_NAME', headerCellClass: 'headerCenter', enableFiltering: true, minWidth: 500, rowHeight: 500 },
        ]
    };

    $scope.gridOptions4 = {
        // enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [

          { displayName: 'IM', field: 'IM', enableFiltering: false, minWidth: 100, type: 'text' },
          { displayName: 'cellName', field: 'cellName', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'KPI_NAME', field: 'KPI_NAME', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'pKPI_WCWK', field: 'pKPI_WCWK', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'FAIL_WCWK', field: 'FAIL_WCWK', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'IM_FO', field: 'IM_FO', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'PROBLEM_CAT', field: 'PROBLEM_CAT', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'SHORT_TERM_SOLUTION', field: 'SHORT_TERM_SOLUTION', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
          { displayName: 'LONG_TERM_SOLUTION', field: 'LONG_TERM_SOLUTION', headerCellClass: 'headerCenter', enableFiltering: false, minWidth: 100, type: '' },
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

    $scope.gridOptions3.enableGridMenu = false;
    $scope.gridOptions3.enableColumnResizing = true;
    $scope.gridOptions3.enableFiltering = true;
    $scope.gridOptions3.fastWatch = true;
    $scope.enableRowSelection = true;
    $scope.gridOptions3.enableRowHeaderSelection = false;
    $scope.gridOptions3.multiSelect = true;
    $scope.gridOptions3.modifierKeysToMultiSelect = false;
    $scope.gridOptions3.noUnselect = true;

    $scope.gridOptions4.enableGridMenu = false;
    $scope.gridOptions4.enableColumnResizing = true;
    $scope.gridOptions4.enableFiltering = true;
    $scope.gridOptions4.fastWatch = true;
    $scope.enableRowSelection = true;
    $scope.gridOptions4.enableRowHeaderSelection = false;
    $scope.gridOptions4.multiSelect = true;
    $scope.gridOptions4.modifierKeysToMultiSelect = false;
    $scope.gridOptions4.noUnselect = true;
    //$scope.gridOptions4 = { enableHorizontalScrollbar:0};

    $http.post("WebServiceMockUp.asmx/GetMockUpRegion",
       { Region: $scope.region, KnowIssue: $scope.KnowIssue, ClosedIM: $scope.ClosedIM, CellAvailability: $scope.CellAvailability, ProblemCat: $scope.ProblemCat })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
       .success(function (data, status, headers, config) {
           $('.loadingIcon').css('display', 'block');
           var obj = JSON.parse(data.d);
           $scope.gridOptions1.data = obj;
       })
       .error(function (data, status, headers, config) {
           var x = data
       })
       .finally(function () {
           $('.loadingIcon').css('display', 'none');
       });

    $scope.reloadGrid1 = function () {
        $http.post("WebServiceMockUp.asmx/GetMockUpRegion",
      { Region: $scope.region, KnowIssue: $scope.KnowIssue, ClosedIM: $scope.ClosedIM, CellAvailability: $scope.CellAvailability })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
      .success(function (data, status, headers, config) {
          $('.loadingIcon').css('display', 'block');
          var obj = JSON.parse(data.d);
          $scope.gridOptions1.data = obj;
      })
      .error(function (data, status, headers, config) {
          var x = data
      })
      .finally(function () {
          $('.loadingIcon').css('display', 'none');
      });
    }

    $scope.reloadHistory = function () {
        $('.loadingIcon').css('display', 'block');
        var IM = $('.IM').val()
        $http.post("WebServiceMockUp.asmx/GetHistory",
            { LoginName: $scope.loginName, WK: $scope.WK, KPI_ID: $scope.KPI_ID, CELL_ID: $scope.CELL_ID })
            .success(function (data, status, headers, config) {
                var obj = JSON.parse(data.d);
                //$scope.gridOptions3.data = obj;
                $scope.ShowRemark = obj;
            }).
             error(function (data, status, headers, config) {
                 var x = data
             })
           .finally(function () {
               $('.loadingIcon').css('display', 'none');
           });
    }

    $scope.showKPIFilter = function () {
        //alert("test one click");
        var kpiDisplay = document.getElementById("kpiDisplay");

        if (kpiDisplay.style.display == "none") {
            $('#kpiDisplay').css('display', 'block');
            //$('#kpiDisplay').show("slide", { direction: "right" }, 500);
        }
        else {
            $('#kpiDisplay').css('display', 'none');
            // $('#kpiDisplay').hide("slide", { direction: "right" }, 500);
        }
    }

    $scope.vm = {};
    $scope.filterKPIName = function () {
        $('.loadingIcon').css('display', 'block');

        var PDLTBFESTAB = $('.2G_pDL_TBF_Estab_Succ').is(":checked");
        var PDLTBFESTABParam = '';
        if (PDLTBFESTAB == true) {
            PDLTBFESTABParam = '2G_%DL TBF Estab_Succ';

        }

        var PHOSR2G = $('.2G_pHO_SR_2G_to_3G').is(":checked");
        var PHOSR2GParam = '';
        if (PHOSR2G == true) {
            PHOSR2GParam = '2G_%HO Success Rate (2G to 3G)';
        }

        var PPACKETIMMASSGN = $('.2G_pPacket_Imm_Assgn_Rej').is(":checked");
        var PPACKETIMMASSGNParam = '';
        if (PPACKETIMMASSGN == true) {
            PPACKETIMMASSGNParam = '2G_%Packet_Imm_Assgn_Rej';
        }

        var PSDCCHBLOCKING = $('.2G_pSDCCH_Blocking').is(":checked");
        var PSDCCHBLOCKINGParam = '';
        if (PSDCCHBLOCKING == true) {
            PSDCCHBLOCKINGParam = '2G_%SDCCH Blocking';
        }

        var PSDCCHDROP = $('.2G_pSDCCH_Drop').is(":checked");
        var PSDCCHDROPParam = '';
        if (PSDCCHDROP == true) {
            PSDCCHDROPParam = '2G_%SDCCH Drop';
        }
        var TCHBLOCKING = $('.2G_pTCH_Blocking').is(":checked");
        var TCHBLOCKINGParam = '';
        if (TCHBLOCKING == true) {
            TCHBLOCKINGParam = '2G_%TCH Blocking';
        }
        var TCHDROP = $('.2G_pTCH_Drop').is(":checked");
        var TCHDROPParam = '';
        if (TCHDROP == true) {
            TCHDROPParam = '2G_%TCH Drop';
        }
        var PULTBFESTABSUCC = $('.2G_pUL_TBF_Estab_Succ').is(":checked");
        var PULTBFESTABSUCCParam = '';
        if (PULTBFESTABSUCC == true) {
            PULTBFESTABSUCCParam = '2G_%UL TBF Estab_Succ';
        }

        var CELLAVAILABILITY = $('.2G_Cell_Availability').is(":checked");
        var CELLAVAILABILITYParam = '';
        if (CELLAVAILABILITY == true) {
            CELLAVAILABILITYParam = '2G_Cell Availability';
        }

        var LLCTHROUGHPUT = $('.2G_LLC_Throughput_kbps_EGPRS_DL').is(":checked");
        var LLCTHROUGHPUTParam = '';
        if (LLCTHROUGHPUT == true) {
            LLCTHROUGHPUTParam = '2G_LLC_Throughput_kbps_EGPRS_DL';
        }

        var CELLAVAILABILITY3G = $('.3G_Cell_Availability').is(":checked");
        var CELLAVAILABILITY3GParam = '';
        if (CELLAVAILABILITY3G == true) {
            CELLAVAILABILITY3GParam = '3G_Cell Availability';
        }

        var CSIRATHOSR = $('.3G_CS_IRAT_HO_SR').is(":checked");
        var CSIRATHOSRParam = '';
        if (CSIRATHOSR == true) {
            CSIRATHOSRParam = '3G_CS IRAT HO Success Rate';
        }

        var CSCSSR3G = $('.3G_CS_CSSR').is(":checked");
        var CSCSSR3GParam = '';
        if (CSCSSR3G == true) {
            CSCSSR3GParam = '3G_CSSR (CS)';
        }
        var CSDROP3G = $('.3G_CS_DROP').is(":checked");
        var CSDROP3GParam = '';
        if (CSDROP3G == true) {
            CSDROP3GParam = '3G_Dropped Calls (CS)';
        }
        var PSCSSR = $('.3G_PS_CSSR').is(":checked");
        var PSCSSRParam = '';
        if (PSCSSR == true) {
            PSCSSRParam = '3G_CSSR (PS)';
        }
        var PSDROP = $('.3G_PS_DROP').is(":checked");
        var PSDROPParam = '';
        if (PSDROP == true) {
            PSDROPParam = '3G_Dropped Calls (PS)';
        }
        var SOFTHOSRCOMBINE = $('.3G_Soft_HO_SR_Combine').is(":checked");
        var SOFTHOSRCOMBINEParam = '';
        if (SOFTHOSRCOMBINE == true) {
            SOFTHOSRCOMBINEParam = '3G_Soft HO Success Rate Combine';
        }
        var THPT = $('.3G_THPT').is(":checked");
        var THPTParam = '';
        if (THPT == true) {
            THPTParam = '3G_Throughput_UE_DL';
        }
        var CELLAVAILABILITY4G = $('.4G_Cell_Availability').is(":checked");
        var CELLAVAILABILITY4GParam = '';
        if (CELLAVAILABILITY4G == true) {
            CELLAVAILABILITY4GParam = '4G_Cell Availability';
        }
        var CSSR4G = $('.4G_CSSR').is(":checked");
        var CSSR4GParam = '';
        if (CSSR4G == true) {
            CSSR4GParam = '4G_PS_CSSR';
        }
        var DROP4G = $('.4G_DROP').is(":checked");
        var DROP4GParam = '';
        if (DROP4G == true) {
            DROP4GParam = '4G_Call Drop Rate';
        }
        var THPT4G = $('.4G_THPT').is(":checked");
        var THPT4GParam = '';
        if (THPT4G == true) {
            THPT4GParam = '4G_Throughput (DL)';
        }

        $http.post("WebServiceMockUp.asmx/getKPIName",
     {
         Region: $scope.region
        , KnowIssue: $scope.KnowIssue
        , ClosedIM: $scope.ClosedIM
        , CellAvailability: $scope.CellAvailability
        , PDLTBFESTAB: PDLTBFESTABParam
        , PHOSR2G: PHOSR2GParam
        , PPACKETIMMASSGN: PPACKETIMMASSGNParam
        , PSDCCHBLOCKING: PSDCCHBLOCKINGParam
        , PSDCCHDROP: PSDCCHDROPParam
        , TCHBLOCKING: TCHBLOCKINGParam
        , TCHDROP: TCHDROPParam
        , PULTBFESTABSUCC: PULTBFESTABSUCCParam
        , CELLAVAILABILITY: CELLAVAILABILITYParam
        , LLCTHROUGHPUT: LLCTHROUGHPUTParam
        , CELLAVAILABILITY3G: CELLAVAILABILITY3GParam
        , CSIRATHOSR: CSIRATHOSRParam
        , CSCSSR3G: CSCSSR3GParam
        , CSDROP3G: CSDROP3GParam
        , PSCSSR: PSCSSRParam
        , PSDROP: PSDROPParam
        , SOFTHOSRCOMBINE: SOFTHOSRCOMBINEParam
        , THPT: THPTParam
        , CELLAVAILABILITY4G: CELLAVAILABILITY4GParam
        , CSSR4G: CSSR4GParam
        , DROP4G: DROP4GParam
        , THPT4G: THPT4GParam
     })
     .success(function (data, status, headers, config) {
         var obj = JSON.parse(data.d);
         $scope.gridOptions1.data = obj;
     }).
      error(function (data, status, headers, config) {
          var x = data
      })
          .finally(function () {
              $('.loadingIcon').css('display', 'none');
          });
    }

    $scope.checkPermission = function () {
        $http.get("GetUserOnline.aspx").
         success(function (data, status, headers, config) {
             var x = data.split(',');
             $scope.userName = x[0];
             $scope.userPermission = x[1];
             if ($scope.userPermission == "ADMIN" || $scope.userPermission == "WORKER") {
                 $('.updateDataClass').css('display', 'block');
                 //$('.cancelDataClass').css('display', 'none');
             }
             else {

                 $('.updateDataClass').css('display', 'none');
                 //$('.cancelDataClass').css('display', 'block');
             }
         }).
        error(function (data, status, headers, config) {
            var x = data
        });

    }

    $scope.changeMobileType = function (mobileType) {

        $('.loadingIcon').css('display', 'block');
        $http.post("WebServiceMockUp.asmx/getMobileType",
       { Region: $scope.region, MobileType: mobileType, KnowIssue: $scope.KnowIssue, ClosedIM: $scope.ClosedIM, CellAvailability: $scope.CellAvailability })// { userName: $scope.userName }).
       .success(function (data, status, headers, config) {
           var obj = JSON.parse(data.d);
           $scope.gridOptions1.data = obj;
       }).
        error(function (data, status, headers, config) {
            var x = data
        })
        .finally(function () {
            $('.loadingIcon').css('display', 'none');
        });

    }
    $scope.OverDueIM = function (overDueType) {

        $scope.OverDue = overDueType;

        $('.loadingIcon').css('display', 'block');
        $http.post("WebServiceMockUp.asmx/getOverDueType",
      { Region: $scope.region, overDueType: overDueType })
      .success(function (data, status, headers, config) {
          var obj = JSON.parse(data.d);
          $scope.gridOptions1.data = obj;
      }).
       error(function (data, status, headers, config) {
           var x = data
       })
       .finally(function () {
           $('.loadingIcon').css('display', 'none');
       });
    }
    //TODO OverDue



    //$http.post("WebServiceMockUp.asmx/GetHistory",
    // { LoginName: $scope.loginName, IM: IM })// region: $scope.region, startFrom: $scope.startFrom, finishDate: $scope.finishDate, search: $scope.search, highlight: '' }).
    // .success(function (data, status, headers, config) {
    //     var obj = JSON.parse(data.d);
    //     $scope.gridOptions2.data = obj;

    // }).
    //    error(function (data, status, headers, config) {
    //        var x = data
    //    });

    //$scope.gridOptions1.onRegisterApi = function (gridApi) {
    //    //set gridApi on scope
    //    $scope.gridApi = gridApi;
    //    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
    //        var msg = 'row selected ' + row.isSelected;
    //        $log.log(msg);
    //    });

    //    gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
    //        var msg = 'rows changed ' + rows.length;
    //        $log.log(msg);
    //    });
    //};

    $scope.Filter = function () {
        $('.loadingIcon').css('display', 'block');

        var IM = $('.IM_Filter').val();
        var WK = $('.WK_Filter').val();
        var KPIName = $('.KPIName_Filter').val();
        var RAN_STATUS = $('.RAN_STATUS_Filter').val();
        var IM_FO = $('.IM_FO_Filter').val();
        var sitecode = $('.sitecode_Filter').val();
        var sitecodeeng = $('.sitecodeeng_Filter').val();
        var NPS = $('.NPS_Filter').val();
        var RAN_REMARK = '';//$('.RAN_REMARK_Filter').val();
        var PROBLEM_CAT = $('.PROBLEM_CAT_Filter').val();
        var SHORT_TERM_SOLUTION = $('.SHORT_TERM_SOLUTION_Filter').val();

        var CR_NUMBER = $('.CR_NUMBER_Filter').val();
        var CR_STATUS = $('.CR_STATUS_Filter').val();
        var SHORT_TERM_TARGET_WK = $('.SHORT_TERM_TARGET_WK_Filter').val();

        var MID_TERM_SOLUTION = '';//$('.MID_TERM_SOLUTION_Filter').val();
        var MID_TERM_SOLUTION_STATUS = '';//$('.MID_TERM_SOLUTION_STATUS_Filter').val();
        var MID_TERM_TARGET_MONTH = '';//$('.MID_TERM_TARGET_MONTH_Filter').val();

        var LONG_TERM_SOLUTION = $('.LONG_TERM_SOLUTION_Filter').val();
        var LONG_TERM_SOLUTION_STATUS = $('.LONG_TERM_SOLUTION_STATUS_Filter').val();
        var LONG_TERM_TARGET_MONTH = $('.LONG_TERM_TARGET_MONTH_Filter').val();

        var KPIValueCompare = $('.KPIValueCompare').val();

        //var REMARK = $('.REMARK_Filter').val();

        $http.post("WebServiceMockUp.asmx/Filter", {
            Region: $scope.region
         , IM: IM
         , KnowIssue: $scope.KnowIssue
         , ClosedIM: $scope.ClosedIM
         , CellAvailability: $scope.CellAvailability
         , KPIName: KPIName
         , WK: WK
         , RAN_STATUS: RAN_STATUS
         , IM_FO: IM_FO
         , sitecode: sitecode
         , sitecodeeng: sitecodeeng
         , NPS: NPS
         , RAN_REMARK: RAN_REMARK
         , PROBLEM_CAT: PROBLEM_CAT
         , SHORT_TERM_SOLUTION: SHORT_TERM_SOLUTION
         , CR_NUMBER: CR_NUMBER
         , CR_STATUS: CR_STATUS
         , SHORT_TERM_TARGET_WK: SHORT_TERM_TARGET_WK
         , MID_TERM_SOLUTION: MID_TERM_SOLUTION
         , MID_TERM_SOLUTION_STATUS: MID_TERM_SOLUTION_STATUS
         , MID_TERM_TARGET_MONTH: MID_TERM_TARGET_MONTH
         , LONG_TERM_SOLUTION: LONG_TERM_SOLUTION
         , LONG_TERM_SOLUTION_STATUS: LONG_TERM_SOLUTION_STATUS
         , LONG_TERM_TARGET_MONTH: LONG_TERM_TARGET_MONTH
         , KPIValueCompare: KPIValueCompare
         , SelectedOption: $scope.selectedOption
            //, REMARK: REMARK
        })
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.gridOptions1.data = obj;
        //$('.row-fluid .span12 .divFilter').hide('');
        $('.row-fluid .span12 .divFilter').hide("slide", { direction: "right" }, 1000);
    })
    .error(function (data, status, headers, config) {
        var x = data.d;
        alert("can not save data ID in (" + x + ")")
    })
       .finally(function () {
           $('.loadingIcon').css('display', 'none');
       });
    }

    $scope.ShowUpdateForm = function (row) {
        //make top of page
        //$('html, body').animate({ scrollTop: 0 }, 0);
        $('html, body').animate({ scrollTop: 0 }, 'slow');

        $('.row-fluid .span12 .divUpdate').show("slide", { direction: "right" }, 500);
        $('.row-fluid .span12 .divFilter').hide("slide", { direction: "right" }, 500);

        //Disable Closed Im Edit
        if ($scope.ClosedIM != '') {
            $('.updateDataClass').css('display', 'none');
        }
        else {
            // $('.updateDataClass').css('display', 'block');
        }

        $('.IM').val(row.entity.IM);
        $scope.IMDisplay = row.entity.IM;
        $('.RAN_OPERATION').val(row.entity.RAN_OPERATION)
        $('.RAN_STATUS').val(row.entity.RAN_STATUS);

        $('.IM_FO').val(row.entity.IM_FO);
        $('.sitecode').val(row.entity.sitecode);
        $('.sitecodeeng').val(row.entity.sitecodeeng);
        $('.NPS').val(row.entity.NPS);
        $scope.sitecodeDisplay = row.entity.sitecode;
        $scope.sitecodeengDisplay = row.entity.sitecodeeng;
        $scope.cellIdDisplay = row.entity.cellName;

        $('.KPI').val(row.entity.KPI_NAME);
        $('.WEEK').val(row.entity.WK);
        $('.RAN_REMARK').val(row.entity.RAN_REMARK);
        $('.PROBLEM_CAT').val(row.entity.PROBLEM_CAT);

        $('.SHORT_TERM_SOLUTION').val(row.entity.SHORT_TERM_SOLUTION);
        $('.CR_NUMBER').val(row.entity.CR_NUMBER);
        $('.CR_STATUS').val(row.entity.CR_STATUS);

        $('.SHORT_TERM_TARGET_WK').val(row.entity.SHORT_TERM_TARGET_WK);
        $('.MID_TERM_SOLUTION').val(row.entity.MID_TERM_SOLUTION);
        $('.MID_TERM_SOLUTION_STATUS').val(row.entity.MID_TERM_SOLUTION_STATUS);

        $('.MID_TERM_TARGET_MONTH').val(row.entity.MID_TERM_TARGET_MONTH);

        $('.LONG_TERM_SOLUTION').val(row.entity.LONG_TERM_SOLUTION);
        $('.LONG_TERM_SOLUTION_STATUS').val(row.entity.LONG_TERM_SOLUTION_STATUS);
        $('.LONG_TERM_TARGET_MONTH').val(row.entity.LONG_TERM_TARGET_MONTH);
        //$('.REMARK').val(row.entity.LONG_TERM_SOLUTION);
        $('.REMARK').val(row.entity.REMARK);
        $scope.WK = row.entity.WK;
        $scope.KPI_ID = row.entity.KPI_ID;
        $scope.CELL_ID = row.entity.CELL_ID;

        $scope.getServerity = row.entity.SERVERITY;
        if ($scope.getServerity == 'Critical') {
            $('.IM').css('background-color', '#de577b');
            $('.IM').css('color', 'white');
        }
        if ($scope.getServerity == 'High') {
            $('.IM').css('background-color', '#f37b53');
            $('.IM').css('color', 'white');
        }
        if ($scope.getServerity == 'Med') {
            $('.IM').css('background-color', '#ffb400');
            $('.IM').css('color', 'white');
        }
        if ($scope.getServerity == 'Low') {
            $('.IM').css('background-color', '#4a8bc2');
            $('.IM').css('color', 'white');
        }


        //TODO:
        $http.get("GetKpiCount.aspx?WK=" + row.entity.WK + "&sitecode=" + row.entity.sitecode)
         .success(function (getdata, status, headers, config) {
             //alert(getdata);

             KPICount2G = getdata[0]["KPICount"];
             KPICount3G = getdata[1]["KPICount"];
             KPICount4G = getdata[2]["KPICount"];

             $('.KPI2G').attr("disabled", true);
             $('.KPI3GU08').attr("disabled", true);
             $('.KPI3GU21').attr("disabled", true);
             $('.KPI4GL18').attr("disabled", true);
             $('.KPI4GL21').attr("disabled", true);

             $('.KPI2G').prop('checked', false);
             $('.KPI3GU08').prop('checked', false);
             $('.KPI3GU21').prop('checked', false);
             $('.KPI4GL18').prop('checked', false);
             $('.KPI4GL21').prop('checked', false);

             if (KPICount2G != "0") {
                 $('.KPI2G').removeAttr("disabled");
             }
             TotalKpiFormat = "2G(" + KPICount2G + "), 3G(" + KPICount3G + "), 4G(" + KPICount4G + ")";
             $('#TotalKPI').val(TotalKpiFormat);


             //Inner HTTP Post
             $scope.Week = row.entity.WK;
             $scope.SiteCode = row.entity.sitecode;

             //$('.KPI4GL21').attr("disabled", true);

             $http.post("WebServiceMockUp.asmx/GetTotalKPI",
             { Region: $scope.region, Week: row.entity.WK, sitecode: row.entity.sitecode })// { userName: $scope.userName }).
             .success(function (data, status, headers, config) {
                 var obj = JSON.parse(data.d);
                 $scope.TotalKPI = obj;
                 for (var i = 0; i < obj.length; i++) {

                     var cell = obj[i]["cellName"];

                     if (cell.substring(0, 3) == 'U08') {
                         $('.KPI3GU08').removeAttr("disabled");
                     }
                     if (cell.substring(0, 3) == 'U21') {
                         $('.KPI3GU21').removeAttr("disabled");
                     }
                     if (cell.substring(0, 3) == 'L18') {
                         $('.KPI4GL18').removeAttr("disabled");
                     }
                     if (cell.substring(0, 3) == 'L21') {
                         $('.KPI4GL21').removeAttr("disabled");
                     }

                     //arrIM.push(obj[i]["IM"]);

                 }

             })
              .error(function (data, status, headers, config) {
                  var x = data
              })
               .finally(function () {

               });
             //End of Inner HTTP Post
             var STTargetWK = row.entity.SHORT_TERM_TARGET_WK;
             //var TGwk = parseInt(STTargetWK.substring(2, 4));
             var TGwk = STTargetWK.substring(2, 4);


             var today = new Date();
             var weekno = today.getWeek();
             var reportWK = parseInt(weekno - 1);
             var reportWKCompare = reportWK - 2;



             var day = new Date();
             var FullYear = day.getFullYear();
             var ShortYear = String(FullYear).substring(2, 4);

             var LTTargetMonth = row.entity.LONG_TERM_TARGET_MONTH;

             $('.displayIMStatus').text('');
             $('.displayIMStatus').css('background-color', 'white');


             // If has LT-Target
             var LTSolution = row.entity.LONG_TERM_SOLUTION;
             var LTSolutionStatus = row.entity.LONG_TERM_SOLUTION_STATUS;
             var LTTargetMonth = row.entity.LONG_TERM_TARGET_MONTH;
             var ProblemCategory = row.entity.PROBLEM_CAT;
             var WKCount = row.entity.WC_COUNT;
             var Week = row.entity.WK;
             if (LTSolution.trim() != '' && LTSolution.trim() != '-') {

                 if (LTSolution == '') { LTSolution = '-' }
                 if (LTSolutionStatus == '') { LTSolutionStatus.trim() = '-' }
                 if (LTTargetMonth == '') { LTTargetMonth = '-' }
                 $('.displayIMStatus').text('Have Long-Term Solution : ' + LTSolution + ' / ' + LTSolutionStatus + ' / ' + LTTargetMonth);
                 $('.displayIMStatus').css('background-color', '#00a489');

             }
             else if (LTSolutionStatus.trim() != '' && LTSolutionStatus.trim() != '-') {
                 if (LTSolution == '') { LTSolution = '-' }
                 if (LTSolutionStatus == '') { LTSolutionStatus.trim() = '-' }
                 if (LTTargetMonth == '') { LTTargetMonth = '-' }
                 $('.displayIMStatus').text('Have Long-Term Solution : ' + LTSolution + ' / ' + LTSolutionStatus + ' / ' + LTTargetMonth);
                 $('.displayIMStatus').css('background-color', '#00a489');
             }
             else if (LTTargetMonth.trim() != '' && LTTargetMonth.trim() != '-') {
                 if (LTSolution == '') { LTSolution = '-' }
                 if (LTSolutionStatus == '') { LTSolutionStatus.trim() = '-' }
                 if (LTTargetMonth == '') { LTTargetMonth = '-' }
                 $('.displayIMStatus').text('Have Long-Term Solution : ' + LTSolution + ' / ' + LTSolutionStatus + ' / ' + LTTargetMonth);
                 $('.displayIMStatus').css('background-color', '#00a489');
             }

             else if (ProblemCategory == 'Under_investigation' || ProblemCategory.trim() == '' || ProblemCategory.trim() == '-') {
                 $('.displayIMStatus').text('NO Action /  Under investigation ( Coming ' + WKCount + ' times since ' + Week + ' ),Contact POSTOPTI and PRO');
                 $('.displayIMStatus').css('background-color', '#de577b');
             }
             else {

                 if ((weekno - TGwk) <= 2) {
                     //alert('This IM will be closed on week 1549.');

                     if (LTTargetMonth.trim() == "" || LTTargetMonth.trim() == "-") {
                         if (TGwk == '51') {
                             $('.displayIMStatus').text('Implemented CR on week <' + ShortYear + (TGwk) + '> Please confirmed stats and IM will be closed on report week <' + (parseInt(ShortYear) + 1) + '01' + '>');
                             $('.displayIMStatus').css('background-color', '#00a489');
                         }
                         else if (TGwk == '52') {
                             $('.displayIMStatus').text('Implemented CR on week <' + ShortYear + (TGwk) + '> Please confirmed stats and IM will be closed on report week <' + (parseInt(ShortYear) + 1) + '02' + '>');
                             $('.displayIMStatus').css('background-color', '#00a489');
                         }
                         else {

                             var resultWK = parseInt(TGwk + 2)
                             if (TGwk.substring(0, 1) == '0') {
                                 var tmpWK = parseInt(TGwk) + 2;
                                 resultWK = '0' + tmpWK;
                             }
                             $('.displayIMStatus').text('Implemented CR on week <' + ShortYear + (TGwk) + '> Please confirmed stats and IM will be closed on report week <' + ShortYear + resultWK + '>');
                             $('.displayIMStatus').css('background-color', '#00a489');
                         }
                     }
                     else {
                         $('.displayIMStatus').text('');
                         $('.displayIMStatus').css('background-color', 'none');
                     }
                 }
                 else if ((weekno - TGwk) > 2) {
                     if (LTTargetMonth.trim() == "" || LTTargetMonth.trim() == "-") {
                         $('.displayIMStatus').text('Contact POSTOPTI and RPO about new solution (Stats does not clear within 2 weeks after implemented CR) !!!');
                         $('.displayIMStatus').css('background-color', '#de577b');
                     }
                     else {
                         $('.displayIMStatus').text('');
                         $('.displayIMStatus').css('background-color', 'none');
                     }
                 }
             }
         })
         .error(function (data, status, headers, config) {
             var x = data
         });
    };

    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        var dayOfYear = ((today - onejan + 1) / 86400000);
        return Math.ceil(dayOfYear / 7)
    }

    $scope.showUpdateFilterForm = function () {
        $scope.clearForm();
    }

    $scope.clearForm = function () {
        $('.IM').val('');
        $('.RAN_STATUS').val('');
        $('.sitecode').val('');
        $('.sitecodeeng').val('');
        $('.IM_FO').val('');
        $('.RAN_REMARK').val('');
        $('.PROBLEM_CAT').val('');

        $('.SHORT_TERM_SOLUTION').val('');
        $('.CR_NUMBER').val('');
        $('.CR_STATUS').val('');

        $('.SHORT_TERM_TARGET_WK').val('');
        $('.MID_TERM_SOLUTION').val('');
        $('.MID_TERM_SOLUTION_STATUS').val('');

        $('.MID_TERM_TARGET_MONTH').val('');
        $('.LONG_TERM_SOLUTION').val('');
        $('.LONG_TERM_SOLUTION_STATUS').val('');

        $('.LONG_TERM_TARGET_MONTH').val('');
        $('.REMARK').val('');
    }
    $scope.CancelData = function () {

        $('.row-fluid .span12 .divUpdate').hide("slide", { direction: "right" }, 500);
        $('.row-fluid .span12 .divFilter').hide("slide", { direction: "right" }, 500);
        $scope.clearForm();

    }


    //get Selected IM from the Table List befor update

    $scope.updateSelection = function ($event, WK, KPI_ID, CELL_ID) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        var combindID = WK + ',' + CELL_ID + ',' + KPI_ID;
        updateSelected(action, combindID);
    };
    var updateSelected = function (action, combindID) {
        if (action === 'add') {
            // $scope.selected.push(id);
            arrIM.push(combindID);
        }
        if (action === 'remove') {
            //$scope.selected.splice($scope.selected.indexOf(id), 1);
            arrIM.splice(arrIM.indexOf(combindID), 1);
        }
    };
    $scope.Update = function () {

        var IM = $('.IM').val();
        var RAN_OPERATION = '';//$('.RAN_OPERATION').val();
        var RAN_STATUS = $('.RAN_STATUS').val();
        var IM_FO = $('.IM_FO').val();
        var RAN_REMARK = '';//$('.RAN_REMARK').val();
        var PROBLEM_CAT = $('.PROBLEM_CAT').val();
        var SHORT_TERM_SOLUTION = $('.SHORT_TERM_SOLUTION').val();

        var CR_NUMBER = $('.CR_NUMBER').val();
        var CR_STATUS = $('.CR_STATUS').val();
        var SHORT_TERM_TARGET_WK = $('.SHORT_TERM_TARGET_WK').val();

        var MID_TERM_SOLUTION = '';//$('.MID_TERM_SOLUTION').val();
        var MID_TERM_SOLUTION_STATUS = '';//$('.MID_TERM_SOLUTION_STATUS').val();
        var MID_TERM_TARGET_MONTH = '';//$('.MID_TERM_TARGET_MONTH').val();

        var LONG_TERM_SOLUTION = $('.LONG_TERM_SOLUTION').val();
        var LONG_TERM_SOLUTION_STATUS = $('.LONG_TERM_SOLUTION_STATUS').val();
        var LONG_TERM_TARGET_MONTH = $('.LONG_TERM_TARGET_MONTH').val();

        var REMARK = $('.REMARK').val();


        //$('.divUpdate').css('display', 'block');
        $('.row-fluid .span12 .divUpdate').show("slide", { direction: "right" }, 500);


        //TODO:
        var KPI2G = "";
        var KPI3GU08 = "";
        var KPI3GU21 = "";
        var KPI4GL18 = "";
        var KPI4GL21 = "";

        if ($('.KPI2G').is(':checked')) {
            // alert("2G Check OK");
            KPI2G = "Y";
        }
        if ($('.KPI3GU08').is(':checked')) {
            //alert("3GU08 Check OK");
            KPI3GU08 = "Y";
        }
        if ($('.KPI3GU21').is(':checked')) {
            //alert("3GU21 Check OK");
            KPI3GU21 = "Y";
        }
        if ($('.KPI4GL18').is(':checked')) {
            //alert("4GL18 Check OK");
            KPI4GL18 = "Y";
        }
        if ($('.KPI4GL21').is(':checked')) {
            // alert("4GL21 Check OK");
            KPI4GL21 = "Y";
        }


        if (confirm("Are you sure to Update?")) {
            $http.post("WebServiceMockUp.asmx/UpdateSingleWC", {
                IM: IM
                , RAN_OPERATION: RAN_OPERATION
                , RAN_STATUS: RAN_STATUS
                , IM_FO: IM_FO
                , RAN_REMARK: RAN_REMARK
                , PROBLEM_CAT: PROBLEM_CAT
                , SHORT_TERM_SOLUTION: SHORT_TERM_SOLUTION
                , CR_NUMBER: CR_NUMBER
                , CR_STATUS: CR_STATUS
                , SHORT_TERM_TARGET_WK: SHORT_TERM_TARGET_WK
                , MID_TERM_SOLUTION: MID_TERM_SOLUTION
                , MID_TERM_SOLUTION_STATUS: MID_TERM_SOLUTION_STATUS
                , MID_TERM_TARGET_MONTH: MID_TERM_TARGET_MONTH
                , LONG_TERM_SOLUTION: LONG_TERM_SOLUTION
                , LONG_TERM_SOLUTION_STATUS: LONG_TERM_SOLUTION_STATUS
                , LONG_TERM_TARGET_MONTH: LONG_TERM_TARGET_MONTH
                , REMARK: REMARK
                , LoginName: $scope.loginName
                , ArrIM: arrIM
                , KPI2G: KPI2G
                , KPI3GU08: KPI3GU08
                , KPI3GU21: KPI3GU21
                , KPI4GL18: KPI4GL18
                , KPI4GL21: KPI4GL21
                , WK: $scope.WK
                , KPI_ID: $scope.KPI_ID
                , CELL_ID: $scope.CELL_ID
            })
            .success(function (data, status, headers, config) {
                alert(data.d);

                $scope.Filter();
                $scope.reloadHistory();

                $('.row-fluid .span12 .divUpdate').hide("slide", { direction: "right" }, 500);
                $scope.reloadGrid1();
            }).
          error(function (data, status, headers, config) {
              var x = data.d;
              alert("can not save data ID in (" + x + ")")
          });
        }
        //else

    };



    $scope.RenderData = function () {
        $('.loadingIcon').css('display', 'block');
        $http.post("WebServiceMockUp.asmx/GetMockUpRegion",
        { Region: $scope.region })// { userName: $scope.userName }).
        .success(function (data, status, headers, config) {
            var obj = JSON.parse(data.d);
            $scope.gridOptions1.data = obj;
        }).
         error(function (data, status, headers, config) {
             var x = data
         })
          .finally(function () {
              $('.loadingIcon').css('display', 'none');
          });
    };
    $scope.setUpReadOnly = function () {

        $scope.selectedOption = $('.KPIValueOption').val()

        if ($scope.selectedOption == '0') {
            $(".KPIValueCompare").attr("readonly", true);
        }
        if ($scope.selectedOption == '1') {
            $(".KPIValueCompare").attr("readonly", false);
        }
        if ($scope.selectedOption == '2') {
            $(".KPIValueCompare").attr("readonly", false);
        }


    }
    $scope.exportToExcel = function () {

        var IM = $('.IM_Filter').val();
        var WK = $('.WK_Filter').val();
        var KPIName = $('.KPIName_Filter').val();
        var RAN_STATUS = $('.RAN_STATUS_Filter').val();
        var IM_FO = $('.IM_FO_Filter').val();

        var RAN_REMARK = '';//$('.RAN_REMARK_Filter').val();
        var PROBLEM_CAT = $('.PROBLEM_CAT_Filter').val();
        var SHORT_TERM_SOLUTION = $('.SHORT_TERM_SOLUTION_Filter').val();

        var CR_NUMBER = $('.CR_NUMBER_Filter').val();
        var CR_STATUS = $('.CR_STATUS_Filter').val();
        var SHORT_TERM_TARGET_WK = $('.SHORT_TERM_TARGET_WK_Filter').val();

        var MID_TERM_SOLUTION = '';//$('.MID_TERM_SOLUTION_Filter').val();
        var MID_TERM_SOLUTION_STATUS = '';//$('.MID_TERM_SOLUTION_STATUS_Filter').val();
        var MID_TERM_TARGET_MONTH = '';//$('.MID_TERM_TARGET_MONTH_Filter').val();

        var LONG_TERM_SOLUTION = $('.LONG_TERM_SOLUTION_Filter').val();
        var LONG_TERM_SOLUTION_STATUS = $('.LONG_TERM_SOLUTION_STATUS_Filter').val();
        var LONG_TERM_TARGET_MONTH = $('.LONG_TERM_TARGET_MONTH_Filter').val();

        var REMARK = $('.REMARK_Filter').val();

        var KPIValueCompare = $('.KPIValueCompare').val();
        //<div style="text-align:right"><a href="ExportExcel.aspx?region={{region}}&startFrom={{startFrom}}&finishDate={{finishDate}}&search={{search}}&admin=0">Export Excel <img src="img/logo-excel.png" style="width:18px;height:18px;" />  </a></div>

        $window.open("ExportExcel.aspx?region=" + $scope.region + "&KnowIssue=" + $scope.KnowIssue + "&ClosedIM=" + $scope.ClosedIM + "&CellAvailability=" + $scope.CellAvailability + "&IM=" + IM + "&WK=" + WK + "&KPIName=" + KPIName + "&RAN_STATUS=" + RAN_STATUS + "&IM_FO=" + IM_FO + "&RAN_REMARK=" + RAN_REMARK + "&PROBLEM_CAT=" + PROBLEM_CAT
                  + "&SHORT_TERM_SOLUTION=" + SHORT_TERM_SOLUTION + "&CR_NUMBER=" + CR_NUMBER + "&CR_STATUS=" + CR_STATUS + "&SHORT_TERM_TARGET_WK=" + SHORT_TERM_TARGET_WK + "&MID_TERM_SOLUTION=" + MID_TERM_SOLUTION
                   + "&MID_TERM_SOLUTION_STATUS=" + MID_TERM_SOLUTION_STATUS + "&MID_TERM_TARGET_MONTH=" + MID_TERM_TARGET_MONTH + "&LONG_TERM_SOLUTION=" + LONG_TERM_SOLUTION
                   + "&LONG_TERM_SOLUTION_STATUS=" + LONG_TERM_SOLUTION_STATUS + "&LONG_TERM_TARGET_MONTH=" + LONG_TERM_TARGET_MONTH + "&REMARK=" + REMARK + "&OverDue=" + $scope.OverDue + "&KPIValueCompare=" + KPIValueCompare + "&SelectedOption=" + $scope.selectedOption);
    };


    $scope.showFilter = function () {
        $('.row-fluid .span12 .divUpdate').hide("slide", { direction: "right" }, 500);
        $('.row-fluid .span12 .divFilter').show("slide", { direction: "right" }, 500);
    }



    //Continue Loading Lookup to DDL

    $scope.selectedKpiNameList = null;
    $scope.KpiNameList = [];
    $http.post("WebServiceMockUp.asmx/GetKpiNameList",
       {})// { userName: $scope.userName }).
       .success(function (data, status, headers, config) {
           var obj = JSON.parse(data.d);
           $scope.KpiNameList = obj;
       })
        .error(function (data, status, headers, config) {
            var x = data
        })
         .finally(function () {

         });

    $scope.selectedRanStatusList = null;
    $scope.Ran_Status_List = [];
    $http.post("WebServiceMockUp.asmx/GetRanStatusList",
      {})// { userName: $scope.userName }).
      .success(function (data, status, headers, config) {
          var obj = JSON.parse(data.d);
          $scope.Ran_Status_List = obj;
      })
       .error(function (data, status, headers, config) {
           var x = data
       })
        .finally(function () {

        });

    $scope.selectedRanOperationList = null;
    $scope.Ran_Operation_List = [];
    $http.post("WebServiceMockUp.asmx/GetRanOperationList",
     {})// { userName: $scope.userName }).
     .success(function (data, status, headers, config) {
         var obj = JSON.parse(data.d);
         $scope.Ran_Operation_List = obj;
     })
      .error(function (data, status, headers, config) {
          var x = data
      })
       .finally(function () {

       });

    $scope.selectedProblemCategoryList = null;
    $scope.Problem_Category_List = [];
    $http.post("WebServiceMockUp.asmx/GetProblemCategoryList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.Problem_Category_List = obj;
    })
     .error(function (data, status, headers, config) {
         var x = data
     })
      .finally(function () {

      });

    $scope.selectedShortTermSolutionList = null;
    $scope.ShortTerm_Solution_List = [];
    $http.post("WebServiceMockUp.asmx/GetShortTermSolutionList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.ShortTerm_Solution_List = obj;
    })
     .error(function (data, status, headers, config) {
         var x = data
     })
      .finally(function () {

      });

    $scope.selectedCRStatusList = null;
    $scope.CR_Status_List = [];
    $http.post("WebServiceMockUp.asmx/GetCRStatusList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.CR_Status_List = obj;
    })
    .error(function (data, status, headers, config) {
        var x = data
    })
     .finally(function () {

     });

    $scope.selectedMidTermSolutionList = null;
    $scope.MidTerm_Solution_List = [];
    $http.post("WebServiceMockUp.asmx/GetMidTermSolutionList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.MidTerm_Solution_List = obj;
    })
    .error(function (data, status, headers, config) {
        var x = data
    })
     .finally(function () {

     });

    $scope.selectedMidTermSolutionStatusList = null;
    $scope.MidTerm_Solution_Status_List = [];
    $http.post("WebServiceMockUp.asmx/GetMidTermSolutionStatusList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.MidTerm_Solution_Status_List = obj;
    })
    .error(function (data, status, headers, config) {
        var x = data
    })
    .finally(function () {

    });

    $scope.selectedLongTermSolutionList = null;
    $scope.LongTerm_Solution_List = [];
    $http.post("WebServiceMockUp.asmx/GetLongTermSolutionList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.LongTerm_Solution_List = obj;
    })
    .error(function (data, status, headers, config) {
        var x = data
    })
    .finally(function () {

    });

    $scope.selectedLongTermSolutionStatusList = null;
    $scope.LongTerm_Solution_Status_List = [];
    $http.post("WebServiceMockUp.asmx/GetLongTermSolutionStatusList",
    {})// { userName: $scope.userName }).
    .success(function (data, status, headers, config) {
        var obj = JSON.parse(data.d);
        $scope.LongTerm_Solution_Status_List = obj;
    })
    .error(function (data, status, headers, config) {
        var x = data
    })
    .finally(function () {

    });
    //End of loading Lookup to DDL
}]);



