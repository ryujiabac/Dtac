<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="pivottable_Default" %>

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

    <style>
        body {
            margin: 0px;
            overflow: hidden;
        }

        form {
            height: 100%;
        }
    </style>
</head>
<body ng-controller="MainCtrl">
    <form id="form1" runat="server">
        <md-progress-linear ng-show="isLoadData" md-mode="indeterminate"></md-progress-linear>

        <div  style="height: 100%" layout="column">
            <md-toolbar flex="none">
                        <div class="md-toolbar-tools">
                            <img src='images/icons/dtac32x32.png' />&nbsp;&nbsp;3G Ericsson CS Cause of Drop
                        </div>
            </md-toolbar>
            <md-toolbar flex="none">
                        <div class="md-toolbar-tools">
                                    <table style="font-size:14px">
                                        <tr>
                                            <td><div class="label">[E3GCSDrop] &gt; {{E3GCSDrop}}</div></td>
                                            <td style="width:150px">
                                                <%--<input type="text" ng-model="E3GCSDrop" style="width:36px"/>--%>
                                                <md-slider flex min="0" max="100" ng-model="E3GCSDrop" class="yellow"></md-slider>
                                            </td>
                                            <td><div class="label">, [PE3GNeighborHODropDis] &gt; {{PE3GNeighborHODropDis}}</div></td>
                                            <td style="width:150px">
                                                <%--<input type="text" ng-model="PE3GNeighborHODropDis" style="width:36px"/>--%>
                                                <md-slider flex min="0" max="100" ng-model="PE3GNeighborHODropDis"></md-slider>
                                            </td>
                                            <td>
                                                <md-button class="md-raised" ng-click="loadData()">Filter</md-button>
                                            </td>
                                            <td>
                                                <div class="label">Result : {{data.length}} rows</div>
                                            </td>
                                        </tr>
                                    </table>
                        </div>
            </md-toolbar>

            <%--<div style="position:relative;background-color:red" flex="grow">--%>
            <%--<div style="position:relative;background-color:red">--%>
            <div ng-if="!isLoadData" ui-grid="gridOptions" style="width: auto" ui-grid-exporter ui-grid-selection flex></div>
            <%--</div>--%>
            <%--</div>--%>
        </div>

    </form>

</body>
</html>
