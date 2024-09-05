<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="CellAvailability.aspx.cs" Inherits="CellAvailability" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="app/mockUp/Default/HightChartsData.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <div class="row-fluid">
        <div class="span12">

            <!-- BEGIN PAGE TITLE & BREADCRUMB-->
            <h3 class="page-title">Worst Cell Report
            </h3>
            <ul class="breadcrumb">
                <li>
                    <a href="Default.aspx">Home</a>
                    <span class="divider">/</span>
                </li>

                <li class="active">Cell Availability
                </li>
                <div style="float: right">As Of: Week <%=this.asOfWeek %> / IM New Comming = <%=this.newCommingIM %>  </div>
            </ul>
            <!-- END PAGE TITLE & BREADCRUMB-->
        </div>
    </div>
    <div class="row-fluid costomMetro">
        <!--BEGIN METRO STATES-->
        <div class="metro-nav">
            <div class="metro-nav-block nav-light-green double">
                <a href="NationWide.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks NationWideIcon"></i>
                    <div class="info NationWideInfo"><%=this.accumulateNationWide %></div>
                    <div class="status">NationWide</div>
                </a>
            </div>
            <div class="metro-nav-block nav-block-orange">
                <a href="BMA.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks BMAIcon"></i>
                    <div class="info BMAInfo"><%=this.accumulateBMA %></div>
                    <div class="status">BMA</div>
                </a>
            </div>
            <div class="metro-nav-block nav-olive">
                <a href="North.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks NorthIcon"></i>
                    <div class="info NorthInfo"><%=this.accumulateNorth %></div>
                    <div class="status">North</div>
                </a>
            </div>
            <div class="metro-nav-block nav-block-yellow">
                <a href="North-east.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks NorthEastIcon"></i>
                    <div class="info NorthEastInfo"><%=this.accumulateNorthEast %></div>
                    <div class="status">NorthEast</div>
                </a>
            </div>
            <div class="metro-nav-block nav-block-green">
                <a href="South-West.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks southWestIcon"></i>
                    <div class="info southWestInfo"><%=this.accumulateSouthWest %></div>
                    <div class="status">South & West</div>
                </a>
            </div>
            <div class="metro-nav-block nav-block-red">
                <a href="Central-East.aspx?CellAvailability=yes" data-original-title="">
                    <i class="icon-tasks CentralEastIcon"></i>
                    <div class="info CentralEastInfo"><%=this.accumulateCentralEast %></div>
                    <div class="status">Central & East</div>
                </a>
            </div>
        </div>
        <%--  <div class="metro-nav">
          
        </div>--%>

        <!--END METRO STATES-->
    </div>
    <div class="row-fluid">
        <div class="span6">
            <div class="widget green classHighChart">
                <div class="widget-title">
                    <h4>Worst Cell / Latest Week</h4>
                </div>
                <%-- <div id="containerHeighChart" style="min-width: 310px; height: 400px; margin: 0 auto;"></div>--%>

                <div ng-controller="hichartCtrl">
                    <highchart id="chart1" config="chartConfig"></highchart>
                    <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                </div>
            </div>
        </div>
        <div class="span6 lineChart">
            <div class="widget blue classHighChart">
                <div class="widget-title">
                    <h4>Worst Cell / Week</h4>
                </div>
                <div ng-controller="hichartCtrl">
                    <highchart id="chart2" config="chartConfigLine"></highchart>
                    <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                </div>
            </div>
        </div>
    </div>
    <div class="row-fluid">
        <div class="span12" ng-controller="hichartCtrl">
            <div class="widget red">
                <div class="widget-title">
                    <h4>Problem Category</h4>
                </div>
                <div id="grid1" ui-grid="gridOptions1" ui-grid-resize-columns
                    ui-grid-pinning
                    ui-grid-exporter
                    ui-grid-pagination class="grid">
                </div>
            </div>
        </div>
        <div class="span12" ng-controller="hichartCtrl">
            <div class="widget green">
                <div class="widget-title">
                    <h4>Pending</h4>
                </div>
                <div id="grid1" ui-grid="gridOptions2" ui-grid-resize-columns
                    ui-grid-pinning
                    ui-grid-exporter
                    ui-grid-pagination class="grid">
                </div>
            </div>
        </div>
    </div>
</asp:Content>

