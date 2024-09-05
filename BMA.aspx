<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="BMA.aspx.cs" Inherits="BMA" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="app/mockUp/UiGrid/UiGridScript.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <input type="hidden" class="hiddenRegion" name="name" value="<%=Region %>" />
    <input type="hidden" class="hiddenKnowIssue" name="" value="<%=Request.QueryString["KnowIssue"]%>" />
    <input type="hidden" class="hiddenClosedIM" name="" value="<%=Request.QueryString["ClosedIM"]%>" />
    <input type="hidden" class="hiddenCellAvailability" name="" value="<%=Request.QueryString["CellAvailability"] %>" />
    <input type="hidden" class="hiddenProblemCat" name="" value="<%=Request.QueryString["ProblemCat"] %>" />
    <div class="row-fluid">
        <div class="span12">
            <h3 class="page-title">
                <%=Region %>
            </h3>
            <ul class="breadcrumb">
                <li>
                    <a href="Default.aspx">Worst Cell</a>
                    <span class="divider">/</span>
                </li>
                <li>
                    <%=Region %>
                </li>
            </ul>
        </div>
    </div>
    <div ng-include="'app/mockUp/UiGrid/UiGridCommon.html'"></div>
</asp:Content>

