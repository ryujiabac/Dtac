using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class North : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;

    public string Region
    {
        get { return "North"; }

    }

    public string userAuthorize { get; set; }
    protected void Page_Load(object sender, EventArgs e)
    {

    }

}