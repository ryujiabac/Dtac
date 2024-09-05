using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetHightChartData : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    public string JsonResult;
    protected void Page_Load(object sender, EventArgs e)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
        SELECT TOP(8) [WK]
        ,[New TT]
	   ,[Closed TT]
	   ,[Accumulated TT]
	   ,[Know Issues] as [Known Issues]
        FROM [dbo].[WCL_IM_COUNT]  
        ORDER BY WK ASC ");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        Response.Write(JsonResult);
        Response.End();
    }
}