<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Privot2.aspx.cs" Inherits="pivottable_Privot2" %>

<!DOCTYPE html>

<html ng-app="worstcellApp">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>


    <script src="../script/jquery-1.8.3.min.js"></script>

    <script src="scripts/angularjs/angular.min.js"></script>

    <script src="scripts/angularjs/angular-animate.min.js"></script>
    <script src="scripts/angularjs/angular-aria.min.js"></script>
    <script src="scripts/angularjs/angular-messages.min.js"></script>


    <link href="scripts/angular-material/angular-material.css" rel="stylesheet" />
    <script src="scripts/angular-material/angular-material.js"></script>

    <link href="../release/ui-grid-unstable.css" rel="stylesheet" />
    <script src="../release/ui-grid-unstable.js"></script>

    <script src="scripts/ng-grid-flexible-height.js"></script>

    <link href="scripts/leaflet/leaflet.css" rel="stylesheet" />
    <script src="scripts/leaflet/leaflet.js"></script>

    <script src="scripts/highchart/highcharts.js"></script>
    <script src="scripts/highchart/highcharts-ng.js"></script>

    <script src="scripts/justgage/justgage.js"></script>
    <script src="scripts/justgage/raphael-2.1.4.min.js"></script>
    <script src="scripts/justgage/angular-gage.min.js"></script>
    

    <script src="scripts/leaflet/plugins/Marker.Rotate.js"></script>
    <script src="scripts/leaflet/plugins/Google.js"></script>



    <%--<script src="scripts/angular-leaflet-directive/angular-leaflet-directive.min.js"></script>--%>
    <script src="scripts/angular-leaflet-directive/angular-leaflet-directive.no-header.js"></script>




    <script src="app.js"></script>
    <script src="Pivot2Controller.js"></script>

    <style>

body{
    margin:0;
    overflow:hidden;
}
.ui-grid {
  position: absolute;
  height: auto;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;

}
    </style>
</head>
<body ng-controller="Pivot2Controller">

    <form id="form1" runat="server">

        <div >
          <md-progress-linear md-mode="indeterminate" ng-show="isLoadData"></md-progress-linear>
          <div ng-if="!isLoadData" id="mygrid" ui-grid="gridOptions" style="width:auto;border:1px solid #eee" ui-grid-exporter ui-grid-selection></div>
          <%--<div id="mygrid" ui-grid="gridOptions" style="width:auto;border:1px solid #eee" ui-grid-selection ui-grid-exporter></div>--%>
        </div>
    </form>

    <script>
        var g_E3GCSDrop = '<%=Request.QueryString["E3GCSDrop"]??"20"%>';
        var g_PE3GNeighborHODropDis = '<%=Request.QueryString["PE3GNeighborHODropDis"]??"50"%>';
    </script>
</body>
</html>