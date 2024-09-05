using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetKpiCount : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    public string JsonResult;
    protected void Page_Load(object sender, EventArgs e)
    {
        var WK = Request.QueryString["WK"];
        var sitecode = Request.QueryString["sitecode"];

        DataTable finalDT = new DataTable();
        finalDT.Clear();
        finalDT.Columns.Add("KPIType");
        finalDT.Columns.Add("KPICount");


        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
        SELECT
        Amount2G = count([SYSTEM])
        FROM [dbo].[V_WCL_EXPORT_EXCEL] ");
        sb.AppendLine("where wk='" + WK + "'");
        sb.AppendLine("and sitecode='" + sitecode + "'");
        sb.AppendLine("and [SYSTEM] = '2G'");

        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        
        DataRow _newRows = finalDT.NewRow();
        _newRows["KPIType"] = "2G";
        _newRows["KPICount"] = dt.Rows[0][0].ToString();
        finalDT.Rows.Add(_newRows);


        sb.Clear();
        sb.AppendLine(@"
        SELECT
        Amount3G = count([SYSTEM])
        FROM [dbo].[V_WCL_EXPORT_EXCEL] ");
        sb.AppendLine("where wk='" + WK + "'");
        sb.AppendLine("and sitecode='" + sitecode + "'");
        sb.AppendLine("and [SYSTEM] = '3G'");
        dt.Clear();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
       
        DataRow _newRows1 = finalDT.NewRow();
        _newRows1["KPIType"] = "3G";
        _newRows1["KPICount"] = dt.Rows[0][0].ToString();
        finalDT.Rows.Add(_newRows1);


        sb.Clear();
        sb.AppendLine(@"
        SELECT 
        Amount4G = count([SYSTEM])
        FROM [dbo].[V_WCL_EXPORT_EXCEL]");
        sb.AppendLine("where wk='" + WK + "'");
        sb.AppendLine("and sitecode='" + sitecode + "'");
        sb.AppendLine("and [SYSTEM] = '4G'");
        dt.Clear();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        
        DataRow _newRows2 = finalDT.NewRow();
        _newRows2["KPIType"] = "4G";
        _newRows2["KPICount"] = dt.Rows[0][0].ToString();
        finalDT.Rows.Add(_newRows2);

        
        JsonResult = conn.ConvertDataTableTojSonString(finalDT);
        Response.Write(JsonResult);
        Response.End();
       
    }
}