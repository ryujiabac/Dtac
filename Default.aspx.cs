using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

public partial class _Default : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    Accumulate acc = new Accumulate();
    public int newCommingIM
    {
        get { return acc.getNewCommingIM(); }
    }
    public int asOfWeek
    {
        get { return acc.getAsOfWeek(); }
    }
    public int accumulateNationWide
    {
        get { return acc.getAccumulateNationWide(); }
    }

    public int accumulateNorth
    {
        get { return acc.getAccumulateNorth(); }
    }

    public int accumulateBMA
    {
        get { return acc.getAccumulateBMA(); }

    }
    public int accumulateCentralEast
    {
        get { return acc.getAccumulateCentralEast(); }

    }
    public int accumulateNorthEast
    {
        get { return acc.getAccumulateNorthEast(); }

    }
    public int accumulateSouthWest
    {
        get { return acc.getAccumulateSouthWest(); }
    }
    public int accumulateVip
    {
        get { return acc.getAccumulateVip(); }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

        }
    }


}