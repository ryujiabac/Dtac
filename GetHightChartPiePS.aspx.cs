using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetHightChartPiePS : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    public string JsonResult;
    protected void Page_Load(object sender, EventArgs e)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        string MobileType = Request.QueryString["MobileType"];
        if (string.IsNullOrEmpty(MobileType))
        {
            sb.AppendLine(@"
         SELECT [KPI_NAME]
         ,[CNT]
         FROM [dbo].[V_WCL_IM_COUNT_PI_PS]
         ORDER BY CNT DESC");
        }
        else if (MobileType == "All")
        {
            sb.AppendLine(@"
                 SELECT [KPI_NAME]
                 ,[CNT]
                 FROM [dbo].[V_WCL_IM_COUNT_PI_PS]
                 ORDER BY CNT DESC");
        }
        else if (MobileType == "2G")
        {
            sb.AppendLine(@"
                 SELECT
                 [KPI_NAME]
                 ,[CNT]
                 FROM [dbo].[V_WCL_IM_COUNT_PI_PS]
                 WHERE 1=1 
                 AND SUBSTRING(KPI_NAME,1,2) = '2G'
                ORDER BY CNT DESC");
        }
        else if (MobileType == "3G")
        {
            sb.AppendLine(@"
                 SELECT
                 [KPI_NAME]
                 ,[CNT]
                 FROM [dbo].[V_WCL_IM_COUNT_PI_PS]
                 WHERE 1=1 
                 AND SUBSTRING(KPI_NAME,1,2) = '3G'
                 ORDER BY CNT DESC");
        }
        else if (MobileType == "4G")
        {
            sb.AppendLine(@"
                 SELECT
                 [KPI_NAME]
                 ,[CNT]
                 FROM [dbo].[V_WCL_IM_COUNT_PI_PS]
                 WHERE 1=1 
                 AND SUBSTRING(KPI_NAME,1,2) = '4G'
                 ORDER BY CNT DESC");
        }
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        Response.Write(JsonResult);
        Response.End();
    }
}