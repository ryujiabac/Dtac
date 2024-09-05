<%@ Page Title="" Language="C#" MasterPageFile="~/WorstCell.master" AutoEventWireup="true" CodeFile="ConditionWCL.aspx.cs" Inherits="ConditionWCL" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentWrapper" runat="Server">
    <form id="formUpload" runat="server">
        <div class="row-fluid">
            <div class="span12">
                <h3 class="page-title">Condition WCL
                </h3>
                <ul class="breadcrumb">
                    <li>
                        <a href="Default.aspx">Dashboard</a>
                        <span class="divider">/</span>
                    </li>
                    <li>Condition WCL
                    </li>
                </ul>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 ConditionWCL">
                <div class="widget blue">
                    <div class="widget-title">
                        <h4 class="ng-binding">Condition WCL</h4>
                        <div class="uploadGroup">
                            <asp:FileUpload CssClass="FileUploadWCL" ID="uploadConditionWCL" runat="server" />
                            <asp:Button ID="btnUploadConditionWCL" runat="server" Text="Upload" CssClass="btn btnUploadConditionWCL" OnClick="btnUploadConditionWCL_Click" />
                        </div>

                    </div>
                    <%--  <img src="UpLoadFolder/ConditionWCL.jpg" />--%>
                  
                    <div class="span12 conditionRow">
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL1.jpg" onclick="view('UpLoadFolder/ConditionWCL1.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL2.jpg" onclick="view('UpLoadFolder/ConditionWCL2.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL3.jpg" onclick="view('UpLoadFolder/ConditionWCL3.jpg')" />
                        </div>
                    </div>
                    <div class="span12 conditionRow">
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL4.jpg" onclick="view('UpLoadFolder/ConditionWCL4.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL5.jpg" onclick="view('UpLoadFolder/ConditionWCL5.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL6.jpg" onclick="view('UpLoadFolder/ConditionWCL6.jpg')" />
                        </div>
                    </div>
                    <div class="span12 conditionRow">
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL7.jpg" onclick="view('UpLoadFolder/ConditionWCL7.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL8.jpg" onclick="view('UpLoadFolder/ConditionWCL8.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL9.jpg" onclick="view('UpLoadFolder/ConditionWCL9.jpg')" />
                        </div>
                    </div>
                      <div class="span12 conditionRow">
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL10.jpg" onclick="view('UpLoadFolder/ConditionWCL10.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL11.jpg" onclick="view('UpLoadFolder/ConditionWCL11.jpg')" />
                        </div>
                        <div class="span4">
                            <img height="250" width="250" src="UpLoadFolder/ConditionWCL12.jpg" onclick="view('UpLoadFolder/ConditionWCL12.jpg')" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="uploadComment span2">There are 12 files name Ex. ConditionWCL1 , ConditionWCL2, ... , ConditionWCL12 </div>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        function view(imgsrc) {
            viewwin = window.open(imgsrc, 'viewwin', 'width=1000,height=600');
        }
    </script>
</asp:Content>

