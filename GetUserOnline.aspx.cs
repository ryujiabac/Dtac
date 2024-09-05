using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GetUserOnline : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    protected void Page_Load(object sender, EventArgs e)
    {
        string[] tmpuser = this.Page.User.Identity.Name.Split('\\');
        string username = tmpuser.Length >= 2 ? tmpuser[1].ToString() : null;
        if (username == null) username = "OSKittikiat";
        var role = checkPermission(username);
        Response.Write(username + ',' + role);
        Response.End();
    }
    public string checkPermission(string userName)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        sb.AppendLine("SELECT  ISNULL(GROUPNAME,0)");
        sb.AppendLine("FROM[dbo].[WCL_USER_AUTHEN]");
        sb.AppendLine("WHERE USERNAME = '" + userName + "'");
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = "";
        if (dt.Rows.Count != 0) { result = dt.Rows[0][0].ToString(); }
        return result;
    }
}