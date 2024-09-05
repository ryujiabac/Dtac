using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WorstCell : System.Web.UI.MasterPage
{
    private string _loginName;

    public string LoginName
    {
        get
        {
            string[] tmpuser = this.Page.User.Identity.Name.Split('\\');
            string username = tmpuser.Length >= 2 ? tmpuser[1].ToString() : null;
            if (username == null) username = "OSKittikiat";
            //string[] userName = this.Page.User.Identity.Name.Split('\\');
            //return userName[1].ToString();
            //string userTest = "OSKittikiat";
            return username;
        }
       
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
