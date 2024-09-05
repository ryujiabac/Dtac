using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class CellAvailability : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    AccumulateCellAvailability acc = new AccumulateCellAvailability();
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
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}