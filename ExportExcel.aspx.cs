using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class ExportExcel : System.Web.UI.Page
{

    public string Region { get; set; }
    public string KnowIssue { get; set; }
    public string ClosedIM { get; set; }
    public string CellAvailability { get; set; }
    public string IM { get; set; }
    public string WK { get; set; }
    public string KPIName { get; set; }
    public string RAN_STATUS { get; set; }
    public string IM_FO { get; set; }
    public string RAN_REMARK { get; set; }
    public string PROBLEM_CAT { get; set; }
    public string SHORT_TERM_SOLUTION { get; set; }
    public string CR_NUMBER { get; set; }
    public string CR_STATUS { get; set; }
    public string SHORT_TERM_TARGET_WK { get; set; }
    public string MID_TERM_SOLUTION { get; set; }
    public string MID_TERM_SOLUTION_STATUS { get; set; }
    public string MID_TERM_TARGET_MONTH { get; set; }
    public string LONG_TERM_SOLUTION { get; set; }
    public string LONG_TERM_SOLUTION_STATUS { get; set; }
    public string LONG_TERM_TARGET_MONTH { get; set; }
    public string REMARK { get; set; }
    public string OverDue { get; set; }
    public string KPIValueCompare { get; set; }
    public string SelectedOption { get; set; }

    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;
    protected void Page_Load(object sender, EventArgs e)
    {
        //System.Windows.Forms.Application.CurrentCulture = new CultureInfo("en-US");

        this.Region = Request.QueryString["region"].ToString().Trim();
        //HTML Parameter problem  [Central] 
        if (Region == "Central") { this.Region = "Central & East"; }
        if (Region == "South") { this.Region = "South & West"; }
        this.KnowIssue = Request.QueryString["KnowIssue"];
        this.ClosedIM = Request.QueryString["ClosedIM"];
        this.CellAvailability = Request.QueryString["CellAvailability"];
        this.IM = Request.QueryString["IM"].ToString().Trim();
        this.WK = Request.QueryString["WK"].ToString().Trim();
        this.KPIName = Request.QueryString["KPIName"].ToString().Trim();
        this.RAN_STATUS = Request.QueryString["RAN_STATUS"].ToString().Trim();
        this.IM_FO = Request.QueryString["IM_FO"].ToString();
        this.RAN_REMARK = Request.QueryString["RAN_REMARK"].ToString().Trim();
        this.PROBLEM_CAT = Request.QueryString["PROBLEM_CAT"].ToString().Trim();
        this.SHORT_TERM_SOLUTION = Request.QueryString["SHORT_TERM_SOLUTION"].ToString().Trim();
        this.CR_NUMBER = Request.QueryString["CR_NUMBER"].ToString().Trim();
        this.CR_STATUS = Request.QueryString["CR_STATUS"].ToString().Trim();
        this.SHORT_TERM_TARGET_WK = Request.QueryString["SHORT_TERM_TARGET_WK"].ToString().Trim();
        this.MID_TERM_SOLUTION = Request.QueryString["MID_TERM_SOLUTION"].ToString().Trim();
        this.MID_TERM_SOLUTION_STATUS = Request.QueryString["MID_TERM_SOLUTION_STATUS"].ToString().Trim();
        this.MID_TERM_TARGET_MONTH = Request.QueryString["MID_TERM_TARGET_MONTH"].ToString().Trim();
        this.LONG_TERM_SOLUTION = Request.QueryString["LONG_TERM_SOLUTION"].ToString().Trim();
        this.LONG_TERM_SOLUTION_STATUS = Request.QueryString["LONG_TERM_SOLUTION_STATUS"].ToString().Trim();
        this.LONG_TERM_TARGET_MONTH = Request.QueryString["LONG_TERM_TARGET_MONTH"].ToString().Trim();
        this.REMARK = Request.QueryString["REMARK"].ToString().Trim();
        this.OverDue = Request.QueryString["OverDue"];
        this.KPIValueCompare = Request.QueryString["KPIValueCompare"];
        this.SelectedOption = Request.QueryString["SelectedOption"];
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();


        sb.AppendLine(@"SELECT[newComming]
        ,[PropostToClose_status]
        ,[WC_count]
        ,[IM]
        ,[WK]
        ,[REGION]
        ,[SYSTEM]
        ,[cellName]
        ,[sitecode]
        ,[NAME_E] as sitecodeeng
        ,[no_Of_kpi]
        ,[cluster]
        ,[NPS]
        ,[serverity]
        ,[countday_wcwk]
        ,[KPI_NAME]
        ,[pKPI_WCWK]
        ,[FAIL_WCWK]
        ,[pKPI_WCWKENDS]
        ,[FAIL_WCWKENDS]
        ,[TypeOfHit]
        ,[RAN_OPERATION]
        ,[RAN_STATUS]
        ,[IM_FO]
        ,[IM_FO_STATUS]
        ,[PROBLEM_CAT]
        ,[SHORT_TERM_SOLUTION]
        ,[CR_NUMBER]
        ,[CR_STATUS]
        ,[SHORT_TERM_TARGET_WK]
        ,[LONG_TERM_SOLUTION]
        ,[LONG_TERM_SOLUTION_STATUS]
        ,[LONG_TERM_TARGET_MONTH]
        ,[RAN_REMARK]
        ,[RAN_REMARK_HIST]");

        if (!string.IsNullOrEmpty(KnowIssue)) { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL_KNOWN_ISSUES]"); }
        else if (!string.IsNullOrEmpty(ClosedIM)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CLOSED]"); }
        else if (!string.IsNullOrEmpty(CellAvailability)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CELL_AVAIL]"); }
        else { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL]"); }

        if (Region == "NationWide") { sb.AppendLine("WHERE 1=1 "); }
        else if (Region == "VIP") { sb.AppendLine("WHERE SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("WHERE REGION = '" + Region + "'"); }

        if (!String.IsNullOrEmpty(IM))
        {
            sb.AppendLine(" and IM like '%" + IM + "%'");
        }
        if (!String.IsNullOrEmpty(WK))
        {
            sb.AppendLine(" and WK like '%" + WK + "%'");
        }
        if (!String.IsNullOrEmpty(KPIName))
        {
            sb.AppendLine(" and [KPI_NAME] like '%" + KPIName + "%'");
        }
        if (!String.IsNullOrEmpty(RAN_STATUS))
        {
            sb.AppendLine(" and RAN_STATUS like '%" + RAN_STATUS + "%'");
        }
        if (!String.IsNullOrEmpty(IM_FO))
        {
            sb.AppendLine(" and IM_FO like '%" + IM_FO + "%'");
        }
        if (!String.IsNullOrEmpty(RAN_REMARK))
        {
            sb.AppendLine(" and RAN_REMARK like '%" + RAN_REMARK + "%'");
        }
        if (!String.IsNullOrEmpty(PROBLEM_CAT))
        {
            sb.AppendLine(" and PROBLEM_CAT like '%" + PROBLEM_CAT + "%'");
        }
        if (!String.IsNullOrEmpty(SHORT_TERM_SOLUTION))
        {
            sb.AppendLine(" and SHORT_TERM_SOLUTION like '%" + SHORT_TERM_SOLUTION + "%'");
        }
        if (!String.IsNullOrEmpty(CR_NUMBER))
        {
            sb.AppendLine(" and CR_NUMBER like '%" + CR_NUMBER + "%'");
        }
        if (!String.IsNullOrEmpty(CR_STATUS))
        {
            sb.AppendLine(" and CR_STATUS like '%" + CR_STATUS + "%'");
        }
        if (!String.IsNullOrEmpty(SHORT_TERM_TARGET_WK))
        {
            sb.AppendLine(" and SHORT_TERM_TARGET_WK like '%" + SHORT_TERM_TARGET_WK + "%'");
        }
        if (!String.IsNullOrEmpty(MID_TERM_SOLUTION))
        {
            sb.AppendLine(" and MID_TERM_SOLUTION like '%" + MID_TERM_SOLUTION + "%'");
        }
        if (!String.IsNullOrEmpty(MID_TERM_SOLUTION_STATUS))
        {
            sb.AppendLine(" and MID_TERM_SOLUTION_STATUS like '%" + MID_TERM_SOLUTION_STATUS + "%'");
        }
        if (!String.IsNullOrEmpty(MID_TERM_TARGET_MONTH))
        {
            sb.AppendLine(" and MID_TERM_TARGET_MONTH like '%" + MID_TERM_TARGET_MONTH + "%'");
        }
        if (!String.IsNullOrEmpty(LONG_TERM_SOLUTION))
        {
            sb.AppendLine(" and LONG_TERM_SOLUTION like '%" + LONG_TERM_SOLUTION + "%'");
        }
        if (!String.IsNullOrEmpty(LONG_TERM_SOLUTION_STATUS))
        {
            sb.AppendLine(" and LONG_TERM_SOLUTION_STATUS like '%" + LONG_TERM_SOLUTION_STATUS + "%'");
        }
        if (!String.IsNullOrEmpty(LONG_TERM_TARGET_MONTH))
        {
            sb.AppendLine(" and LONG_TERM_TARGET_MONTH like '%" + LONG_TERM_TARGET_MONTH + "%'");
        }
        if (!String.IsNullOrEmpty(KPIValueCompare) && SelectedOption == "1")
        {
            sb.AppendLine("and pKPI_WCWK <= '@KPIValueCompare'".Replace("@KPIValueCompare", KPIValueCompare));
        }
        if (!String.IsNullOrEmpty(KPIValueCompare) && SelectedOption == "2")
        {
            sb.AppendLine("and pKPI_WCWK >= '@KPIValueCompare'".Replace("@KPIValueCompare", KPIValueCompare));
        }


        if (!String.IsNullOrEmpty(OverDue))
        {
            if (OverDue == "ShortTerm")
            {
                sb.AppendLine("and[SHORT_TERM_TARGET_WK] is not null");
                sb.AppendLine("and[SHORT_TERM_TARGET_WK] <> '-'");
                sb.AppendLine("and[SHORT_TERM_TARGET_WK] <> ' '");
                sb.AppendLine("and ([LONG_TERM_SOLUTION] = '-' or [LONG_TERM_SOLUTION] = '' or [LONG_TERM_SOLUTION] is null )");
                sb.AppendLine("and ([LONG_TERM_SOLUTION_STATUS] = '-' or [LONG_TERM_SOLUTION_STATUS] = '' or [LONG_TERM_SOLUTION_STATUS] is null )");
                sb.AppendLine("and ([LONG_TERM_TARGET_MONTH] = '-' or [LONG_TERM_TARGET_MONTH] = '' or [LONG_TERM_TARGET_MONTH] is null )");
                sb.AppendLine("and CONVERT(int, DATEPART(wk, GETDATE())-1) > CONVERT(int, SUBSTRING([SHORT_TERM_TARGET_WK], 3, 2))");
            }
            if (OverDue == "LongTerm")
            {
                sb.AppendLine("and[LONG_TERM_TARGET_MONTH] is not null");
                sb.AppendLine("and[LONG_TERM_TARGET_MONTH] <> ''");
                sb.AppendLine("and[LONG_TERM_TARGET_MONTH] <> '-'");
                sb.AppendLine("and getdate()> CASE(SUBSTRING([LONG_TERM_TARGET_MONTH], 5, 2))");
                sb.AppendLine("WHEN 'Q1' THEN convert(datetime, SUBSTRING([LONG_TERM_TARGET_MONTH], 1, 4)+'0331 23:59:59')");
                sb.AppendLine("WHEN 'Q2' THEN convert(datetime, SUBSTRING([LONG_TERM_TARGET_MONTH], 1, 4)+'0630 23:59:59')");
                sb.AppendLine("WHEN 'Q3' THEN convert(datetime, SUBSTRING([LONG_TERM_TARGET_MONTH], 1, 4)+'0930 23:59:59')");
                sb.AppendLine("WHEN 'Q4' THEN convert(datetime, SUBSTRING([LONG_TERM_TARGET_MONTH], 1, 4)+'1231 23:59:59')");
                sb.AppendLine("ELSE ''");
                sb.AppendLine("END");
            }
            if (OverDue == "STNoTarget")
            {
                sb.AppendLine("and[PROBLEM_CAT] <> 'Under_investigation'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] is not null");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> ''");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> '-'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> '0'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] not like '%under%'");
                sb.AppendLine("AND([SHORT_TERM_TARGET_WK] is null OR[SHORT_TERM_TARGET_WK] = '-')");
                sb.AppendLine("AND([LONG_TERM_SOLUTION] is null OR[LONG_TERM_SOLUTION] = '-')");
                sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
                sb.AppendLine("Order by WK,IM");
            }
            if (OverDue == "STNoCR")
            {
                sb.AppendLine("and[PROBLEM_CAT] <> 'Under_investigation'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] is not null");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> ''");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> '-'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] <> '0'");
                sb.AppendLine("AND[SHORT_TERM_SOLUTION] not like '%under%'");
                sb.AppendLine("AND([CR_NUMBER] is null OR[CR_NUMBER] = '-')");
                sb.AppendLine("AND([SHORT_TERM_TARGET_WK] is null OR[SHORT_TERM_TARGET_WK] = '-')");
                sb.AppendLine("AND([LONG_TERM_SOLUTION] is null OR[LONG_TERM_SOLUTION] = '-')");
                sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
                sb.AppendLine("Order by WK,IM");
            }
            if (OverDue == "LTNoTarget")
            {
                sb.AppendLine("AND[PROBLEM_CAT] <> 'Under_investigation'");
                sb.AppendLine("AND[LONG_TERM_SOLUTION] is not null");
                sb.AppendLine("AND[LONG_TERM_SOLUTION] <> ''");
                sb.AppendLine("AND[LONG_TERM_SOLUTION] <> '-'");
                sb.AppendLine("AND[LONG_TERM_SOLUTION] <> '0'");
                sb.AppendLine("AND[LONG_TERM_SOLUTION] not like '%under%'");
                sb.AppendLine("AND([LONG_TERM_TARGET_MONTH] is null OR[LONG_TERM_TARGET_MONTH] = '-')");
                sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
                sb.AppendLine("Order by WK,IM");
            }
            if (OverDue == "NoAction")
            {
                sb.AppendLine("and[PROBLEM_CAT] = 'Under_investigation'");
                sb.AppendLine("OR[PROBLEM_CAT] is null");
                sb.AppendLine("OR[PROBLEM_CAT] = ''");
                sb.AppendLine("OR[PROBLEM_CAT] = '-'");
                sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
                sb.AppendLine("Order by WK,IM");

            }
        }


        CultureInfo enCulture = new CultureInfo("en-US");

        DateTime date = DateTime.Now;
        string timeStamp = string.Format(enCulture, "{0:yyyyMMddhhmmss}", date);


        string fileInfo = Server.MapPath("~/Excel/Template/Template.xlsx");//@"D:\WorstCell\WorstCell.Web\Excel\Template\Template.xlsx";

        string[] tmpuser = this.Page.User.Identity.Name.Split('\\');
        string username = tmpuser.Length >= 2 ? tmpuser[1].ToString() : null;
        if (username == null) username = "OSKittikiat";

        //Generate Region
        string RegionExcel = "";
        if (Region == "NationWide") { RegionExcel = "NationWide"; }
        else if (Region == "BMA") { RegionExcel = "BMA"; }
        else if (Region == "Central & East") { RegionExcel = "CE"; }
        else if (Region == "North") { RegionExcel = "N"; }
        else if (Region == "NorthEast") { RegionExcel = "NE"; }
        else if (Region == "South & West") { RegionExcel = "SW"; }
        else if (Region == "VIP") { RegionExcel = "VIP"; }
        //Generate OverDue  ShortTerm LongTerm STNoTarget STNoCR LTNoTarget NoAction 
        string OverDueExcel = "";
        if (OverDue == "ShortTerm") { OverDueExcel = "STOverdue"; }
        else if (OverDue == "LongTerm") { OverDueExcel = "LTOverdue"; }
        else if (OverDue == "STNoTarget") { OverDueExcel = "STNoTarget"; }
        else if (OverDue == "STNoCR") { OverDueExcel = "STNoCR"; }
        else if (OverDue == "LTNoTarget") { OverDueExcel = "LTNoTarget"; }
        else if (OverDue == "NoAction") { OverDueExcel = "NoAction"; }

        string fileName = ""; //= timeStamp + "_" + RegionExcel + "_" + username + ".xlsx";
        if (!String.IsNullOrEmpty(OverDue)) { fileName = timeStamp + "_" + OverDueExcel + "_" + RegionExcel + "_" + username + ".xlsx"; }
        else
        {
            fileName = timeStamp + "_" + RegionExcel + "_" + username + ".xlsx";
        }

        string outputFile = Server.MapPath("~/Excel/NewData/" + fileName);
        //string outputFile = @"D:\WorstCell\WorstCell.Web\Excel\NewData\

        dt = conn.getDataTabale(sb.ToString(), connectionString);

        using (ExcelPackage excel = new ExcelPackage(new FileInfo(fileInfo)))
        {
            ExcelWorksheet worksheet = null;

            worksheet = excel.Workbook.Worksheets.Add("HiddenCode");

            var hiddeCodeCell = worksheet.Cells[1, 1];
            hiddeCodeCell.Value = generateID(fileName, username);

            worksheet = excel.Workbook.Worksheets["template"];
            WriteDataTable(worksheet, dt);

            excel.SaveAs(new FileInfo(outputFile));


            Response.AddHeader("content-disposition", "attachment; filename=" + fileName);
            Response.WriteFile(outputFile);
            Response.Flush();
            //Remove file from server defence for increase storage
            File.Delete(outputFile);
            Response.End();
            //This can send the string to AJAX Post
            //Response.Write("/Excel/NewData/" + fileName);
            //Response.End();
        }
    }

    public string generateID(string fileName, string userName)
    {
        string uniqueID = Guid.NewGuid().ToString("N");

        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
        INSERT INTO[dbo].[WCL_EXCEL_VERSION]
           ([CODENAME]
           ,[DATE_EXPORT]
           ,[DATE_IMPORT]
           ,[LOGIN_NAME_EXPORT]
           ,[LOGIN_NAME_IMPORT]
           ,[DATETIME_IMPORT_TO_DB]
           ,[UPDATE_ROW_COUNT]
           ,[UPDATE_ROW_COMPLETE]
           ,[DATETIME_IMPORT_FINISH]
           ,[EXPORT_FILE_NAME])
        VALUES");
        sb.AppendLine("('" + uniqueID + "'");
        sb.AppendLine(", GETDATE()");
        sb.AppendLine(", null");
        sb.AppendLine(", '" + userName + "'");
        sb.AppendLine(", null");
        sb.AppendLine(", null");
        sb.AppendLine(", null");
        sb.AppendLine(", null");
        sb.AppendLine(", null");
        sb.AppendLine(", '" + fileName + "')");
        var result = conn.SaveData(sb.ToString(), connectionString);
        return uniqueID;
    }
    public static void WriteDataTable(ExcelWorksheet ews, DataTable dt, int startRow = 2)
    {

        //WriteDataHeader(ews, dt, startRow - 1);   //Write header.

        //Write rows.
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            WriteDataRow(ews, dt.Rows[i], i + startRow);
        }
    }
    private static void WriteDataRow(ExcelWorksheet ews, DataRow row, int rowIndex)
    {

        for (int i = 0; i < row.Table.Columns.Count; i++)
        {
            var cell = ews.Cells[rowIndex, i + 1];
            if (row[i].GetType().Name == "String")
                cell.Value = String.Format("{0}", row[i]);
            else
                cell.Value = row[i];

            // Fill Trend
            if (row.Table.Columns[i].ColumnName.IndexOf("Trend") == 0)
            {

                var fill = cell.Style.Fill;
                fill.PatternType = ExcelFillStyle.Solid;
                if ((double)cell.Value > 0)
                    //green
                    fill.BackgroundColor.SetColor(Color.FromArgb(128, 255, 0));
                //orange
                else
                    fill.BackgroundColor.SetColor(Color.FromArgb(255, 128, 0));
            }

            // Fill Rank
            if (row.Table.Columns[i].ColumnName.IndexOf("Rank") == 0)
            {

                var fill = cell.Style.Fill;

                if ((String)cell.Value == "L")
                {
                    //yellow
                    fill.PatternType = ExcelFillStyle.Solid;
                    fill.BackgroundColor.SetColor(Color.FromArgb(255, 255, 128));
                }
                else if ((String)cell.Value == "SL")
                {
                    //red
                    fill.PatternType = ExcelFillStyle.Solid;
                    fill.BackgroundColor.SetColor(Color.FromArgb(255, 0, 0));
                }

            }
        }
    }
}