angular.module('mockup', ['ngAnimate', 'ngTouch', 'ngDialog', 'ui.grid', 'ui.grid.pagination', 'ui.grid.cellNav', 'ui.grid.rowEdit'
    , 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection'
    , 'ui.grid.moveColumns'])
.controller("mockup.mainControl", ['$scope', '$http', '$timeout', 'uiGridConstants', function ($scope, $http, $timeout, uiGridConstants) {

    $scope.userName = "";
    $scope.userPermission = "";
    $scope.userAdmin = [];
    $scope.regionOption = [];
    $scope.regionOptionAll = [];
    $scope.peopleOption = [];
    $scope.eventAreaOption = [];
    $scope.eventStatusOption = [];
    $scope.tmpData = "";
    $scope.updateDate = "";

    $scope.ranStatus = [];
    /////////////////////////Function/////////////////////////


    //$scope.getUserOnline = function () {
    //    $http.get("GetUserOnline.aspx").
    //     success(function (data, status, headers, config) {
    //         var x = data.split(',');
    //         $scope.userName = x[0];
    //         $scope.userPermission = x[1];
    //     }).
    //    error(function (data, status, headers, config) {
    //        var x = data
    //    });
    //}



    $scope.checkUser = function () {

        if ($scope.userName == "OSWorapot")
            return true;
        else
            return false;
    }
    //GetLastUpdate


    $scope.GetLastUpdate = function () {
        $http.post("WebServiceMockUp.asmx/GetLastUpdate", {}).
       success(function (data, status, headers, config) {
           $scope.updateDate = data.d;
       });
    }

    $scope.GetRanStatus = function () {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "DropdownRanStatus" }).
        success(function (data, status, headers, config) {
            var tmpData = data.d.split(',');
            //$scope.regionOptionAll.push({
            //    name: "ALL",
            //    id: 0
            //})
            for (var i = 0; i < tmpData.length; i++) {
                $scope.ranStatus.push({
                    name: tmpData[i],
                    id: i
                })
                //$scope.regionOptionAll.push({
                //    name: tmpData[i],
                //    id: i + 1
                //})
            }
            $scope.$broadcast('ranStatus', $scope.ranStatus);
            //$scope.$broadcast('regionOptionAll', $scope.regionOptionAll);
        });
    }
    //$scope.GetRegionOption = function () {
    //    $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "DropdownRegion" }).
    //   success(function (data, status, headers, config) {
    //       var tmpData = data.d.split(',');
    //       $scope.regionOptionAll.push({
    //           name: "ALL",
    //           id: 0
    //       })
    //       for (var i = 0; i < tmpData.length; i++) {
    //           $scope.regionOption.push({
    //               name: tmpData[i],
    //               id: i
    //           })
    //           $scope.regionOptionAll.push({
    //               name: tmpData[i],
    //               id: i + 1
    //           })
    //       }
    //       $scope.$broadcast('regionOption', $scope.regionOption);
    //       $scope.$broadcast('regionOptionAll', $scope.regionOptionAll);
    //   });
    //}

    $scope.GetPeopleOption = function () {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "DropdownPeople" }).
       success(function (data, status, headers, config) {
           var tmpData = data.d.split('|');
           for (var i = 0; i < tmpData.length; i++) {
               $scope.peopleOption.push({
                   name: tmpData[i],
                   id: i
               })
           }
           $scope.$broadcast('peopleOption', $scope.peopleOption);
       });
    }

    $scope.GetEventStatus = function () {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "DropdownStatus" }).
       success(function (data, status, headers, config) {
           var tmpData = data.d.split(',');
           for (var i = 0; i < tmpData.length; i++) {
               $scope.eventStatusOption.push({
                   name: tmpData[i],
                   id: i
               })
           }
           $scope.$broadcast('eventStatusOption', $scope.eventStatusOption);
       });
    }

    $scope.GetEventAreaOption = function () {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "DropdownEventArea" }).
       success(function (data, status, headers, config) {
           var tmpData = data.d.split(',');
           for (var i = 0; i < tmpData.length; i++) {
               $scope.eventAreaOption.push({
                   name: tmpData[i],
                   id: i
               })
           }
           $scope.$broadcast('areaOption', $scope.eventAreaOption);
       });
    }

    $scope.getWeekNumber = function (d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        // Return array of year and week number
        var year = d.getFullYear().toString();

        return "wk" + year.substr(year.length - 2) + weekNo;
    }

    $scope.GetUserAdmin = function () {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: "adminUser" }).
      success(function (data, status, headers, config) {
          $scope.userAdmin = data.d.split(',');
      }).
         error(function (data, status, headers, config) {
             var x = data
         });
    }

    $scope.GetAppSetting = function (appKeyString) {
        $http.post("WebServiceMockUp.asmx/GetAppSetting", { appKey: appKeyString }).
        success(function (data, status, headers, config) {
            $scope.tmpData = data.d;
            return data.d;
        }).
           error(function (data, status, headers, config) {
               var x = data
           });
    }
}]);