<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="ExcelStatus.aspx.cs" Inherits="ExcelStatus" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="app/mockUp/ExcelStatus/ExcelStatus.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <div class="row-fluid" ng-controller="mockup.excelStatus">
        <div class="span12">
            <h3>USER: <%=LoginName %> </h3>
            <div class="widget green">
                <div class="widget-title">
                    <h4>Excel Status</h4>
                </div>
                <div id="grid1" ui-grid="gridOptions1" ui-grid-resize-columns
                    ui-grid-pinning
                    ui-grid-exporter
                    ui-grid-pagination class="grid">
                </div>

            </div>
        </div>
    </div>
    <div class="row-fluid" ng-controller="mockup.excelStatus">
        <div class="span12">
            <div class="widget orange">
                <div class="widget-title">
                    <h4>Excel Completed</h4>
                </div>
                <div id="grid2" ui-grid="gridOptions2" ui-grid-resize-columns
                    ui-grid-pinning
                    ui-grid-exporter
                    ui-grid-pagination class="grid">
                </div>

            </div>
        </div>
    </div>

</asp:Content>

