using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class pivottable_Privot2 : System.Web.UI.Page
{
    private string connectionString = @"Data Source=192.168.16.233;Initial Catalog=KPI_RAW;User ID=nmc;Password=dmedium";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

        }
    }


}