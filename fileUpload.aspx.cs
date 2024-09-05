using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class fileUpload : System.Web.UI.Page
{
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void UploadFile(object sender, EventArgs e)
    {
        string uniqueID = "";
        try
        {

            if (string.IsNullOrEmpty(WorstCellFileUpload.PostedFile.FileName))
            {
                ClientScript.RegisterStartupScript(typeof(Page), "", "alert('Please select the file');", true);
            }
            else
            { //TODO
                string fileName = Path.GetFileName(WorstCellFileUpload.PostedFile.FileName);
                WorstCellFileUpload.PostedFile.SaveAs(Server.MapPath("~/" + "UpLoadFolder" + "/" + fileName));



                string path = Server.MapPath("~/" + "UpLoadFolder" + "/" + fileName);

                string[] tmpuser = this.Page.User.Identity.Name.Split('\\');
                string username = tmpuser.Length >= 2 ? tmpuser[1].ToString() : null;
                if (username == null) username = "OSKittikiat";

                CultureInfo enCulture = new CultureInfo("en-US");
                string timeStamp = string.Format(enCulture, "{0:yyyyMMddhhmmss}", DateTime.Now);

                var finalFileName = timeStamp + "_" + fileName;

                // string fileInfo = @"D:\WorstCell\WorstCell.Web\Excel\Template\Template.xlsx";

                using (ExcelPackage excel = new ExcelPackage(new FileInfo(path)))
                {
                    ExcelWorksheet worksheet = null;
                    worksheet = excel.Workbook.Worksheets["HiddenCode"];
                    uniqueID = worksheet.Cells[1, 1].Text.ToString().Trim();
                }
                bool result = this.checkValidExcelSheet(uniqueID, username,finalFileName);
                if (result == false)
                {
                    ClientScript.RegisterStartupScript(typeof(Page), "closePage", "alert('Invalid Excel File'); window.close();", true);
                    File.Delete(path);
                }
                if (result == true)
                {

                   
                    System.IO.File.Move(Server.MapPath("~/" + "UpLoadFolder" + "/" + fileName), Server.MapPath("~/" + "UpLoadFolder" + "/" + finalFileName));


                    //---Run on Server
                    using (var imp = new DTAC.Impersonator("webappuser", "192.168.16.151", "Webappp@ss01", true))
                    {
                        File.Copy(Server.MapPath("~/" + "UpLoadFolder" + "/" + finalFileName), @"\\192.168.16.151\bt$\importExcel\" + finalFileName);
                    }

                    //Call Store for P'dear script
                    using (SqlConnection con = new SqlConnection(connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("IMP_EXCEL_FILE", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@excelFileName", finalFileName);
                            con.Open();
                            cmd.ExecuteNonQuery();
                        }
                    }
                    File.Delete(Server.MapPath("~/" + "UpLoadFolder" + "/" + finalFileName));
                    ClientScript.RegisterStartupScript(typeof(Page), "closePage", "alert('Upload Completed Please see progress on Excel Status menu.'); window.close();", true);
                }
            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
        ClientScript.RegisterStartupScript(typeof(Page), "closePage", "window.close();", true);
    }

    public bool checkValidExcelSheet(string uniqueID, string username,string finalFileName)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine("select");
        sb.AppendLine("count(*)");
        sb.AppendLine("from[dbo].[WCL_EXCEL_VERSION]");
        sb.AppendLine("where");
        sb.AppendLine("DATE_IMPORT is null ");
        sb.AppendLine(" and CODENAME = '" + uniqueID + "'");

        dt = conn.getDataTabale(sb.ToString(), connectionString);
        if (dt.Rows[0][0].ToString() == "0")
        {
            return false;
        }
        else
        {
            sb.Clear();

            sb.AppendLine("UPDATE[dbo].[WCL_EXCEL_VERSION]");
            sb.AppendLine("SET");
            sb.AppendLine("[DATE_IMPORT] = GETDATE()");
            sb.AppendLine(",[LOGIN_NAME_IMPORT] = '" + username + "' ");
            sb.AppendLine(",[DATETIME_IMPORT_TO_DB] = GETDATE()");
            sb.AppendLine(",[IMPORT_FILE_NAME] = '"+finalFileName+"'");
            sb.AppendLine("WHERE CODENAME = '" + uniqueID + "'");
            bool result = conn.SaveData(sb.ToString(), connectionString);

            return result;
        }
    }
}