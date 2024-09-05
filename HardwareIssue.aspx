<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="HardwareIssue.aspx.cs" Inherits="HardwareIssue" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="app/mockUp/HardwareIssue/HardwareIssue.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <div ng-controller="HardwareIssueCtrl">
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

                    <li class="active">Hardware Issue
                    </li>
                    <div style="float: right">As Of: Week <%=this.asOfWeek %> / IM New Comming = <%=this.newCommingIM %>  </div>
                </ul>
                <!-- END PAGE TITLE & BREADCRUMB-->
            </div>
        </div>
        <div class="row-fluid costomMetro">
            <!--BEGIN METRO STATES-->
            <div class="metro-nav">
                <div class="metro-nav-block nav-light-green">
                    <a href="" data-original-title="" ng-click="BindGrid('NationWide');">
                        <i class="icon-tasks NationWideIcon"></i>
                        <div class="info NationWideInfo" style='font-size: 48px'><%=this.accumulateNationWide %></div>
                        <div class="status">NationWide</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-red">
                    <a href="" data-original-title="" ng-click="BindGrid('VIP');">
                        <i class="icon-tasks VipIcon"></i>
                        <div class="info VipInfo" style='font-size: 48px'><%=this.accumulateVip %></div>
                        <div class="status">VIP</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-orange">
                    <a href="" data-original-title="" ng-click="BindGrid('BMA');">
                        <i class="icon-tasks BMAIcon"></i>
                        <div class="info BMAInfo" style='font-size: 48px'><%=this.accumulateBMA %></div>
                        <div class="status">BMA</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-olive">
                    <a href="" data-original-title="" ng-click="BindGrid('North');">
                        <i class="icon-tasks NorthIcon"></i>
                        <div class="info NorthInfo" style='font-size: 48px'><%=this.accumulateNorth %></div>
                        <div class="status">North</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-yellow">
                    <a href="" data-original-title="" ng-click="BindGrid('NorthEast');">
                        <i class="icon-tasks NorthEastIcon"></i>
                        <div class="info NorthEastInfo" style='font-size: 48px'><%=this.accumulateNorthEast %></div>
                        <div class="status">NorthEast</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-green">
                    <a href="" data-original-title="" ng-click="BindGrid('South & West');">
                        <i class="icon-tasks southWestIcon"></i>
                        <div class="info southWestInfo" style='font-size: 48px'><%=this.accumulateSouthWest %></div>
                        <div class="status">South & West</div>
                    </a>
                </div>
                <div class="metro-nav-block nav-block-purple">
                    <a href="" data-original-title="" ng-click="BindGrid('Central & East');">
                        <i class="icon-tasks CentralEastIcon"></i>
                        <div class="info CentralEastInfo" style='font-size: 48px'><%=this.accumulateCentralEast %></div>
                        <div class="status">Central & East</div>
                    </a>
                </div>
            </div>
            <!--END METRO STATES-->
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="widget red mainLoadingIcon">
                    <div class="widget-title">
                        <h4>{{region}}</h4>
                    </div>
                    <div class="loadingIconNew">
                        <img src="img/ajax-loader-bert2.gif" alt="" />
                    </div>
                    <div id="grid1" ui-grid="gridOptions1" ui-grid-resize-columns
                        ui-grid-pinning
                        ui-grid-exporter
                        ui-grid-pagination class="grid">
                    </div>
                </div>
            </div>

        </div>
    </div>
</asp:Content>

