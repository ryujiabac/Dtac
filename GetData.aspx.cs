using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetData : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            switch (Request.QueryString["action"])
            {
                case "kpi_list":
                    Response.Write(GetKPIList());
                    Response.End();
                    break;
                case "data_WCL_IM_COUNT_KPI":
                    Response.Write(GetData_WCL_IM_COUNT_KPI(Request.QueryString["kpiName"]));
                    Response.End();
                    break;
            }
        }
    }

    public string GetKPIList()
    {
        DBConnection db = new DBConnection();
        string sql = @"
select distinct kpi_name as id from [WCL_IM_COUNT_KPI]
WHERE WK = (select MAX(WK) from [WCL_IM_COUNT_KPI])
";
        var dt = db.getDataTabale(sql, connectionString);
        return JsonConvert.SerializeObject(dt);
    }

    public string GetData_WCL_IM_COUNT_KPI(string kpiName)
    {
        DBConnection db = new DBConnection();
        string sql = @"
	select WK as week,kpi_name as id,accIm as value 
	from WCL_IM_COUNT_KPI
	WHERE kpi_name like @kpiName
	ORDER BY WK ASC
";
        var dt = db.getDataTabale(sql.Replace("@kpiName", "'" + kpiName + "'"), connectionString);
        return JsonConvert.SerializeObject(dt);
    }
}