using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ConditionWCL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnUploadConditionWCL_Click(object sender, EventArgs e)
    {
        try
        {
            if (!string.IsNullOrEmpty(uploadConditionWCL.PostedFile.FileName))
            {
                string fileName = uploadConditionWCL.PostedFile.FileName;
                uploadConditionWCL.PostedFile.SaveAs(Server.MapPath("~/" + "UpLoadFolder" + "/" + fileName));
            }
            else
            {
                ClientScript.RegisterStartupScript(typeof(Page), "", "alert('Please select the file');", true);
            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
    }
}