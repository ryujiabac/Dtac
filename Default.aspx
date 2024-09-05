<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="app/mockUp/Default/HightChartsData.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <div ng-controller="hichartCtrl">
        <div class="row-fluid">
            <div class="span12">
                <!-- BEGIN THEME CUSTOMIZER-->
                <%--<div class="hidden-phone" id="theme-change">
                <i class="icon-cogs"></i>
                <span class="settings">
                    <span class="text">Theme Color:</span>
                    <span class="colors">
                        <span data-style="default" class="color-default"></span>
                        <span data-style="green" class="color-green"></span>
                        <span data-style="gray" class="color-gray"></span>
                        <span data-style="purple" class="color-purple"></span>
                        <span data-style="red" class="color-red"></span>
                    </span>
                </span>
            </div>--%>
                <!-- END THEME CUSTOMIZER-->
                <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                <h3 class="page-title">Worst Cell Report
                </h3>
                <ul class="breadcrumb">
                    <li>
                        <a href="Default.aspx">Home</a>
                        <span class="divider">/</span>
                    </li>

                    <li class="active">Dashboard
                    </li>
                    <%--<li class="pull-right search-wrap">
                    <form class="hidden-phone" action="search_result.html">
                        <div class="input-append search-input-area">
                            <input type="text" id="appendedInputButton" class="">
                            <button type="button" class="btn"><i class="icon-search"></i></button>
                        </div>
                    </form>
                </li>--%>

                    <div style="float: right">As Of: Week <%=this.asOfWeek %> / IM New Comming = <%=this.newCommingIM %>  </div>
                    <li>
                        <%--<a href="#" style="float:right;">
                        <div class="task-info">
                            <div class="desc"></div>
                            <div class="percent">44%</div>
                        </div>
                        <div class="progress progress-striped active no-margin-bot">
                            <div class="bar" style="width: 44%;"></div>
                        </div>
                    </a>--%>
                   
                    </li>
                </ul>
                <!-- END PAGE TITLE & BREADCRUMB-->
            </div>
        </div>
        <div class="row-fluid costomMetro">
            <!--BEGIN METRO STATES-->
            <div class="metro-nav">
                <div class="metro-nav-block nav-light-green">
                    <a href="NationWide.aspx" data-original-title="">
                        <i class="icon-tasks NationWideIcon"></i>
                        <div class="info NationWideInfo" style='font-size: 48px'><%=this.accumulateNationWide %></div>
                        <div class="status">NationWide</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-red">
                    <a href="Vip.aspx" data-original-title="">
                        <i class="icon-tasks VipIcon"></i>
                        <div class="info VipInfo" style='font-size: 48px'><%=this.accumulateVip %></div>
                        <div class="status">VIP</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-orange">
                    <a href="BMA.aspx" data-original-title="">
                        <i class="icon-tasks BMAIcon"></i>
                        <div class="info BMAInfo" style='font-size: 48px'><%=this.accumulateBMA %></div>
                        <div class="status">BMA</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-olive">
                    <a href="North.aspx" data-original-title="">
                        <i class="icon-tasks NorthIcon"></i>
                        <div class="info NorthInfo" style='font-size: 48px'><%=this.accumulateNorth %></div>
                        <div class="status">North</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-yellow">
                    <a href="North-east.aspx" data-original-title="">
                        <i class="icon-tasks NorthEastIcon"></i>
                        <div class="info NorthEastInfo" style='font-size: 48px'><%=this.accumulateNorthEast %></div>
                        <div class="status">NorthEast</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-green">
                    <a href="South-West.aspx" data-original-title="">
                        <i class="icon-tasks southWestIcon"></i>
                        <div class="info southWestInfo" style='font-size: 48px'><%=this.accumulateSouthWest %></div>
                        <div class="status">South & West</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-purple">
                    <a href="Central-East.aspx" data-original-title="">
                        <i class="icon-tasks CentralEastIcon"></i>
                        <div class="info CentralEastInfo" style='font-size: 48px'><%=this.accumulateCentralEast %></div>
                        <div class="status">Central & East</div>
                    </a>
                </div>
            </div>


            <!--END METRO STATES-->
        </div>
        <%--  <div class="row-fluid">
        <div class="span6">
            <div class="widget green classHighChart">
                <div class="widget-title">
                    <h4>Worst Cell / Latest Week</h4>
                </div>
                <div ng-controller="hichartCtrl">
                    <highchart id="chart1" config="chartConfig"></highchart>
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
                </div>
            </div>
        </div>
    </div>--%>
        <div class="row-fluid">
            <div class="span6 StackChart">
                <div class="widget yellow classHighChart">
                    <div class="widget-title">
                        <h4>▼ Worst Cell Statistic Weekly</h4>
                    </div>
                    <div>
                        <highchart id="chart3" config="chartConfigStack"></highchart>
                        <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                    </div>
                </div>
            </div>
            <div class="span6 ProblemCategoryPieChart">
                <div class="widget orange classHighChart">
                    <div class="widget-title">
                        <h4>▼ Problem Category NationWide</h4>
                        <div class="controls">
                            <select class="input-medium m-wrap" ng-init="modelid='NationWide'" ng-model="modelid" ng-change="pieChartRegionChange()">
                                <option value="NationWide" selected="selected">NationWide</option>
                                <option value="BMA">BMA</option>
                                <option value="North">North</option>
                                <option value="NorthEast">NorthEast</option>
                                <option value="ShoutWest">South & West</option>
                                <option value="CentralEast">Central & East</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <highchart id="chart4" config="chartConfigProblemCategoryBMAPie"></highchart>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6 StackChart">
                <div class="widget green classHighChart">
                    <div class="widget-title">
                        <h4>▼ Worst Cell Statistic per System / KPIs</h4>
                        <div class="controls">
                            <select class="input-medium m-wrap" ng-options="obj.id as obj.label for obj in selectKpiList"
                                ng-model="selectKpiValue" ng-change="chartKPIChange()" style="width: 260px">
                                <%--<option ng-repeat="obj in selectKpiList" value="{{obj.id}}">{{obj.name}}</option>--%>
                            </select>
                        </div>
                    </div>
                    <div>
                        <highchart config="dataWCL_IM_COUNT_KPIByWeek"></highchart>
                        <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                    </div>
                </div>
            </div>
            <div class="span6 ProblemCategoryClosedPieChart">
                <div class="widget purple classHighChart">
                    <div class="widget-title">
                        <h4>▼ Problem Category Closed</h4>
                        <div class="controls">
                            <select class="input-medium m-wrap" ng-init="modelidClosed='NationWide'" ng-model="modelidClosed" ng-change="ProblemCateClosedpieChartRegionChange()">
                                <option value="NationWide" selected="selected">NationWide</option>
                                <option value="BMA">BMA</option>
                                <option value="North">North</option>
                                <option value="NorthEast">NorthEast</option>
                                <option value="ShoutWest">South & West</option>
                                <option value="CentralEast">Central & East</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <highchart id="chart5" config="chartConfigProblemCategoryClosedPie"></highchart>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                <div class="widget yellow pieChartCS">
                    <div class="widget-title">
                        <h4>▼ CS KPI Problem Category</h4>
                        <div class="controls">
                            <select class="input-medium m-wrap" ng-init="modelCS='All'" ng-model="modelCS" ng-change="PieChartCSChange()">
                                <option value="All" selected="selected">All</option>
                                <option value="2G">2G</option>
                                <option value="3G">3G</option>
                                <option value="4G">4G</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <highchart id="pieCS" config="chartConfigPieCS"></highchart>
                        <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                    </div>
                </div>
            </div>
            <div class="span6">

                <div class="widget blue pieChartPS">
                    <div class="widget-title">
                        <h4>▼ PS KPI Problem Category</h4>
                        <div class="controls">
                            <select class="input-medium m-wrap" ng-init="modelPS='All'" ng-model="modelPS" ng-change="PieChartPSChange()">
                                <option value="All" selected="selected">All</option>
                                <option value="2G">2G</option>
                                <option value="3G">3G</option>
                                <option value="4G">4G</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <highchart id="piePS" config="chartConfigPiePS"></highchart>
                        <%-- <input class="btn" type="button" ng-click="getHightChartsData()" value="HightChart">--%>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="widget red">
                    <div class="widget-title">
                        <h4>▼ Problem Category</h4>
                    </div>
                    <div id="gridProblemCategory" ui-grid="gridOptions1" ui-grid-resize-columns
                        ui-grid-pinning
                        ui-grid-exporter
                        ui-grid-pagination class="grid" style="height:auto">
                    </div>
                </div>
            </div>
            <div class="span12">
                <div class="widget green">
                    <div class="widget-title">
                        <h4>▼ Worst Cell : Aging</h4>
                    </div>
                    <div id="gridPending" ui-grid="gridOptions2" ui-grid-resize-columns
                        ui-grid-pinning
                        ui-grid-exporter
                        ui-grid-pagination class="grid" style="height:124px">
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

