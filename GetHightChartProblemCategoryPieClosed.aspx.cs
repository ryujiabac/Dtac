using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetHightChartProblemCategoryPieClosed : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    public string JsonResult;
    protected void Page_Load(object sender, EventArgs e)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        string Region = Request.QueryString["Region"];


        if (string.IsNullOrEmpty(Region))
        {
            sb.AppendLine(@"
        select
       [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
        ,Amount = Total
        FROM [dbo].[V_WCL_PROBLEM_CAT_Closed]
        where [Problem Category] is not null
        order by Amount DESC         
        ");
        }
        else if (Region == "NationWide")
        {
            sb.AppendLine(@"
            select
           [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
             ,Amount = Total
             FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
             where[Problem Category] is not null
             
             order by Amount DESC");
        }
        else if (Region == "BMA")
        {
            sb.AppendLine(@"
            select
          [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
            ,Amount = BMA
            FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
            where[Problem Category] is not null
            
             order by Amount DESC");
        }
        else if (Region == "North")
        {
            sb.AppendLine(@"
            select
           [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
            ,Amount = North
            FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
            where[Problem Category] is not null
           
             order by Amount DESC");
        }
        else if (Region == "NorthEast")
        {
            sb.AppendLine(@"
            select
           [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
            ,Amount = NorthEast
            FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
            where[Problem Category] is not null
            
             order by Amount DESC");
        }
        else if (Region == "ShoutWest")
        {
            sb.AppendLine(@"
            select
          [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
            ,Amount =  [South & West]
            FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
            where[Problem Category] is not null
            
             order by Amount DESC");
        }
        else if (Region == "CentralEast")
        {
            sb.AppendLine(@"
            select
            [Problem Category] = case when [Problem Category] = '' then 'Unknown'
			                     else [Problem Category] end
            ,Amount =  [Central & East]
            FROM[dbo].[V_WCL_PROBLEM_CAT_Closed]
            where[Problem Category] is not null
            
             order by Amount DESC");
        }
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        Response.Write(JsonResult);
        Response.End();
    }
}