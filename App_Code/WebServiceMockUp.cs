using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.Web.Mail;
using System.Text;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.IO;
using System.Web.UI;
using System.Collections;
/// <summary>
/// Summary description for WebServiceMockUp
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class WebServiceMockUp : System.Web.Services.WebService
{
    public class MockUp
    {
        public string cellId { get; set; }
        public string kpiId { get; set; }
        public string countDay { get; set; }
    }


    public string JsonResult;
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetTotalKPI(string Region, string Week, string sitecode)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"SELECT[newComming]
      ,[PropostToClose_status]
      ,[WC_COUNT]
      ,[IM]
      ,[WK]
      ,[REGION]
      ,[SYSTEM]
      ,[cellName]
      ,[sitecode]
      ,[NAME_E] as sitecodeeng
      ,[no_Of_kpi]
      ,[CLUSTER]
      ,[NPS]
      ,[SERVERITY]
      ,[COUNTDAY_WCWK]
      ,[KPI_NAME]
      ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                    when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                    when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                    end,'N2')
      ,[FAIL_WCWK]  = FORMAT(case when TypeOfHit = 'Weekday' then Fail_WCWK
                    when TypeOfHit = 'Weekend' then Fail_WCWKENDS
                    when TypeOfHit = 'WholeWeek' then (Fail_WCWK + Fail_WCWKENDS) / 2
                    end,'N2')
      ,[pKPI_WCWKENDS]
      ,[FAIL_WCWKENDS]
      ,[TypeOfHit]
      ,[RAN_OPERATION]
      ,[RAN_STATUS]
      ,[IM_FO]
      ,[IM_FO_STATUS]
      ,[RAN_REMARK]
      ,[RAN_REMARK_HIST]
      ,[PROBLEM_CAT]
      ,[SHORT_TERM_SOLUTION]
      ,[CR_NUMBER]
      ,[CR_STATUS]
      ,[SHORT_TERM_TARGET_WK]
      ,[MID_TERM_SOLUTION]
      ,[MID_TERM_SOLUTION_STATUS]
      ,[MID_TERM_TARGET_MONTH]
      ,[LONG_TERM_SOLUTION]
      ,[LONG_TERM_SOLUTION_STATUS]
      ,[LONG_TERM_TARGET_MONTH]
      ,[REMARK]
      ,[name_t]
      ,[GRADE]
      ,[KPI_ID]
      ,[CELL_ID]
");
        sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL]");
        sb.AppendLine("WHERE 1=1");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("and REGION = '@Region'".Replace("@Region", Region)); }
        sb.AppendLine("and[WK] = '@Week'".Replace("@Week", Week));
        sb.AppendLine("and sitecode = '@sitecode'".Replace("@sitecode", sitecode));
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetLongTermSolutionStatusList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        LongTerm_Solution_Status
                        from [dbo].[wcl_lookup_LongTerm_Solution_Status]
                        order by LongTerm_Solution_Status");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetLongTermSolutionList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        LongTerm_Solution
                        from [dbo].[wcl_lookup_LongTerm_Solution]
                        order by LongTerm_Solution");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetMidTermSolutionStatusList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        MidTerm_Solution_Status
                        from [dbo].[wcl_lookup_MidTerm_Solution_Status]
                        order by MidTerm_Solution_Status");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetMidTermSolutionList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        MidTerm_Solution
                        from [dbo].[wcl_lookup_MidTerm_Solution]
                        order by MidTerm_Solution");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetCRStatusList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        CR_Status
                        from [dbo].[wcl_lookup_CR_Status]
                        order by CR_Status");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetShortTermSolutionList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        ShortTerm_Solution
                        from [dbo].[wcl_lookup_ShortTerm_Solution]
                        order by ShortTerm_Solution");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetProblemCategoryList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select 
                        Problem_Category
                        from [dbo].[wcl_lookup_Problem_Category]
                        order by Problem_Category");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetRanOperationList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"Select
                        Ran_Operation
                        from [dbo].[wcl_lookup_Ran_Operation]
                        order by Ran_Operation");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetRanStatusList()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"select
                        Ran_Status
                        from [dbo].[wcl_lookup_Ran_Status]
                        order by Ran_Status");

        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetKpiNameList() //Bind to DDL
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"SELECT KPI_NAME2
                      FROM WCL_MAP_KPI_NAME
                      WHERE KPI_NAME2 is not null
                      order by KPI_NAME2");

        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getKPIName
    (
         string Region
       , string KnowIssue
       , string ClosedIM
       , string CellAvailability
       , string PDLTBFESTAB
       , string PHOSR2G
       , string PPACKETIMMASSGN
       , string PSDCCHBLOCKING
       , string PSDCCHDROP
       , string TCHBLOCKING
       , string TCHDROP
       , string PULTBFESTABSUCC
       , string CELLAVAILABILITY
       , string LLCTHROUGHPUT
       , string CELLAVAILABILITY3G
       , string CSIRATHOSR
       , string CSCSSR3G
       , string CSDROP3G
       , string PSCSSR
       , string PSDROP
       , string SOFTHOSRCOMBINE
       , string THPT
       , string CELLAVAILABILITY4G
       , string CSSR4G
       , string DROP4G
       , string THPT4G
    )
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"SELECT[newComming]
                    ,[PropostToClose_status]
                    ,[WC_COUNT]
                    ,[IM]
                    ,[WK]
                    ,[REGION]
                    ,[SYSTEM]
                    ,[cellName]
                    ,[sitecode]
                    ,[no_Of_kpi]
                    ,[CLUSTER]
                    ,[NPS]
                    ,[SERVERITY]
                    ,[COUNTDAY_WCWK]
                    ,[KPI_NAME]
                    ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                    when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                    when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                    end,'N2')
                    ,[FAIL_WCWK]
                    ,[pKPI_WCWKENDS]
                    ,[FAIL_WCWKENDS]
                    ,[TypeOfHit]
                    ,[RAN_OPERATION]
                    ,[RAN_STATUS]
                    ,[IM_FO]
                    ,[IM_FO_STATUS]
                    ,[RAN_REMARK]
                    ,[RAN_REMARK_HIST]
                    ,[PROBLEM_CAT]
                    ,[SHORT_TERM_SOLUTION]
                    ,[CR_NUMBER]
                    ,[CR_STATUS]
                    ,[SHORT_TERM_TARGET_WK]
                    ,[MID_TERM_SOLUTION]
                    ,[MID_TERM_SOLUTION_STATUS]
                    ,[MID_TERM_TARGET_MONTH]
                    ,[LONG_TERM_SOLUTION]
                    ,[LONG_TERM_SOLUTION_STATUS]
                    ,[LONG_TERM_TARGET_MONTH]
                    ,[REMARK]
                    ,[NAME_T]
                    ,[NAME_E] as sitecodeeng
                    ,[KPI_ID]
                    ,[CELL_ID]                    
                    ");
        if (!string.IsNullOrEmpty(KnowIssue)) { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL_KNOWN_ISSUES]"); }
        else if (!string.IsNullOrEmpty(ClosedIM)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CLOSED]"); }
        else if (!string.IsNullOrEmpty(CellAvailability)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CELL_AVAIL]"); }
        else { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL]"); }

        sb.AppendLine("WHERE 1=1 ");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("and REGION = '" + Region + "'"); }

        if (!String.IsNullOrEmpty(PDLTBFESTAB) ||
            !String.IsNullOrEmpty(PHOSR2G) ||
            !String.IsNullOrEmpty(PPACKETIMMASSGN) ||
            !String.IsNullOrEmpty(PSDCCHBLOCKING) ||
            !String.IsNullOrEmpty(PSDCCHDROP) ||
            !String.IsNullOrEmpty(TCHBLOCKING) ||
            !String.IsNullOrEmpty(TCHDROP) ||
            !String.IsNullOrEmpty(PULTBFESTABSUCC) ||
            !String.IsNullOrEmpty(CELLAVAILABILITY) ||
            !String.IsNullOrEmpty(LLCTHROUGHPUT) ||
            !String.IsNullOrEmpty(CELLAVAILABILITY3G) ||
            !String.IsNullOrEmpty(CSIRATHOSR) ||
            !String.IsNullOrEmpty(CSCSSR3G) ||
            !String.IsNullOrEmpty(CSDROP3G) ||
            !String.IsNullOrEmpty(PSCSSR) ||
            !String.IsNullOrEmpty(PSDROP) ||
            !String.IsNullOrEmpty(SOFTHOSRCOMBINE) ||
            !String.IsNullOrEmpty(THPT) ||
            !String.IsNullOrEmpty(CELLAVAILABILITY4G) ||
            !String.IsNullOrEmpty(CSSR4G) ||
            !String.IsNullOrEmpty(DROP4G) ||
            !String.IsNullOrEmpty(THPT4G))
        {
            sb.AppendLine(" and KPI_NAME IN(''");
            if (!String.IsNullOrEmpty(PDLTBFESTAB))
            {
                sb.AppendLine(" ,'@PDLTBFESTAB'".Replace("@PDLTBFESTAB", PDLTBFESTAB));
            }
            if (!String.IsNullOrEmpty(PHOSR2G))
            {
                sb.AppendLine(" ,'@PHOSR2G'".Replace("@PHOSR2G", PHOSR2G));
            }
            if (!String.IsNullOrEmpty(PPACKETIMMASSGN))
            {
                sb.AppendLine(" ,'@PPACKETIMMASSGN'".Replace("@PPACKETIMMASSGN", PPACKETIMMASSGN));
            }
            if (!String.IsNullOrEmpty(PSDCCHBLOCKING))
            {
                sb.AppendLine(" ,'@PSDCCHBLOCKING'".Replace("@PSDCCHBLOCKING", PSDCCHBLOCKING));
            }
            if (!String.IsNullOrEmpty(PSDCCHDROP))
            {
                sb.AppendLine(" ,'@PSDCCHDROP'".Replace("@PSDCCHDROP", PSDCCHDROP));
            }
            if (!String.IsNullOrEmpty(TCHBLOCKING))
            {
                sb.AppendLine(" ,'@TCHBLOCKING'".Replace("@TCHBLOCKING", TCHBLOCKING));
            }
            if (!String.IsNullOrEmpty(TCHDROP))
            {
                sb.AppendLine(" ,'@TCHDROP'".Replace("@TCHDROP", TCHDROP));
            }
            if (!String.IsNullOrEmpty(PULTBFESTABSUCC))
            {
                sb.AppendLine(" ,'@PULTBFESTABSUCC'".Replace("@PULTBFESTABSUCC", PULTBFESTABSUCC));
            }
            if (!String.IsNullOrEmpty(CELLAVAILABILITY))
            {
                sb.AppendLine(" ,'@CELLAVAILABILITY'".Replace("@CELLAVAILABILITY", CELLAVAILABILITY));
            }
            if (!String.IsNullOrEmpty(LLCTHROUGHPUT))
            {
                sb.AppendLine(" ,'@LLCTHROUGHPUT'".Replace("@LLCTHROUGHPUT", LLCTHROUGHPUT));
            }
            if (!String.IsNullOrEmpty(CELLAVAILABILITY3G))
            {
                sb.AppendLine(" ,'@CELLAVAILABILITY3G'".Replace("@CELLAVAILABILITY3G", CELLAVAILABILITY3G));
            }
            if (!String.IsNullOrEmpty(CSIRATHOSR))
            {
                sb.AppendLine(" ,'@CSIRATHOSR'".Replace("@CSIRATHOSR", CSIRATHOSR));
            }
            if (!String.IsNullOrEmpty(CSCSSR3G))
            {
                sb.AppendLine(" ,'@CSCSSR3G'".Replace("@CSCSSR3G", CSCSSR3G));
            }
            if (!String.IsNullOrEmpty(CSDROP3G))
            {
                sb.AppendLine(" ,'@CSDROP3G'".Replace("@CSDROP3G", CSDROP3G));
            }
            if (!String.IsNullOrEmpty(PSCSSR))
            {
                sb.AppendLine(" ,'@PSCSSR'".Replace("@PSCSSR", PSCSSR));
            }
            if (!String.IsNullOrEmpty(PSDROP))
            {
                sb.AppendLine(" ,'@PSDROP'".Replace("@PSDROP", PSDROP));
            }
            if (!String.IsNullOrEmpty(SOFTHOSRCOMBINE))
            {
                sb.AppendLine(" ,'@SOFTHOSRCOMBINE'".Replace("@SOFTHOSRCOMBINE", SOFTHOSRCOMBINE));
            }
            if (!String.IsNullOrEmpty(THPT))
            {
                sb.AppendLine(" ,'@THPT'".Replace("@THPT", THPT));
            }
            if (!String.IsNullOrEmpty(CELLAVAILABILITY4G))
            {
                sb.AppendLine(" ,'@CELLAVAILABILITY4G'".Replace("@CELLAVAILABILITY4G", CELLAVAILABILITY4G));
            }
            if (!String.IsNullOrEmpty(CSSR4G))
            {
                sb.AppendLine(" ,'@CSSR4G'".Replace("@CSSR4G", CSSR4G));
            }
            if (!String.IsNullOrEmpty(DROP4G))
            {
                sb.AppendLine(" ,'@DROP4G'".Replace("@DROP4G", DROP4G));
            }
            if (!String.IsNullOrEmpty(THPT4G))
            {
                sb.AppendLine(" ,'@THPT4G'".Replace("@THPT4G", THPT4G));
            }

            sb.AppendLine(",'')");
        }
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getProblemCategory()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
       SELECT [Problem Category] = case when REPLACE([Problem Category],'_',' ')  is null then 'Unknown'
			                     else REPLACE([Problem Category],'_',' ')  end
       ,[BMA]
      ,[Central & East]
      ,[North]
      ,[NorthEast]
      ,[South & West]
      ,[NationWide] = [Total]
       FROM [dbo].[V_WCL_PROBLEM_CAT]
       order by Total DESC,North DESC,BMA DESC,[Central & East] DESC,NorthEast DESC,[South & West] DESC ");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getOverDueType(string Region, string overDueType)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        if (overDueType == "ShortTerm")
        {
            sb.AppendLine(@"SELECT[newComming]
                            ,[PropostToClose_status]
                            ,[WC_COUNT]
                            ,[IM]
                            ,[WK]
                            ,[WC_COUNT]
                            ,[REGION]
                            ,[SYSTEM]
                            ,[cellName]
                            ,[sitecode]
                            ,[no_Of_kpi]
                            ,[CLUSTER]
                            ,[NPS]
                            ,[SERVERITY]
                            ,[COUNTDAY_WCWK]
                            ,[KPI_NAME]
                            ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                             when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                             when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                             end,'N2')
                            ,[FAIL_WCWK]
                            ,[pKPI_WCWKENDS]
                            ,[FAIL_WCWKENDS]
                            ,[TypeOfHit]
                            ,[RAN_OPERATION]
                            ,[RAN_STATUS]
                            ,[IM_FO]
                            ,[IM_FO_STATUS]
                            ,[RAN_REMARK]
                            ,[RAN_REMARK_HIST]
                            ,[PROBLEM_CAT]
                            ,[SHORT_TERM_SOLUTION]
                            ,[CR_NUMBER]
                            ,[CR_STATUS]
                            ,[SHORT_TERM_TARGET_WK]
                            ,[MID_TERM_SOLUTION]
                            ,[MID_TERM_SOLUTION_STATUS]
                            ,[MID_TERM_TARGET_MONTH]
                            ,[LONG_TERM_SOLUTION]
                            ,[LONG_TERM_SOLUTION_STATUS]
                            ,[LONG_TERM_TARGET_MONTH]
                            ,[REMARK]
                            ,[name_t]
                            ,[GRADE]
                            ,[NAME_E] as sitecodeeng
                            ,[KPI_ID]
                            ,[CELL_ID]
                             FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1=1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
            sb.AppendLine("and[SHORT_TERM_TARGET_WK] is not null");
            sb.AppendLine("and[SHORT_TERM_TARGET_WK] <> '-'");
            sb.AppendLine("and[SHORT_TERM_TARGET_WK] <> ' '");
            sb.AppendLine("and ([LONG_TERM_SOLUTION] = '-' or [LONG_TERM_SOLUTION] = '' or [LONG_TERM_SOLUTION] is null )");
            sb.AppendLine("and ([LONG_TERM_SOLUTION_STATUS] = '-' or [LONG_TERM_SOLUTION_STATUS] = '' or [LONG_TERM_SOLUTION_STATUS] is null )");
            sb.AppendLine("and ([LONG_TERM_TARGET_MONTH] = '-' or [LONG_TERM_TARGET_MONTH] = '' or [LONG_TERM_TARGET_MONTH] is null )");
            sb.AppendLine("and (CONVERT(int, DATEPART(wk, GETDATE())) - CONVERT(int, SUBSTRING([SHORT_TERM_TARGET_WK], 3, 2))) > 2");
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);

        }
        else if (overDueType == "LongTerm")
        {
            sb.Clear();
            sb.AppendLine(@"SELECT[newComming]
                         ,[PropostToClose_status]
                         ,[WC_COUNT]
                         ,[IM]
                         ,[WK]
                         ,[REGION]
                         ,[SYSTEM]
                         ,[cellName]
                         ,[sitecode]
                         ,[no_Of_kpi]
                         ,[CLUSTER]
                         ,[NPS]
                         ,[SERVERITY]
                         ,[COUNTDAY_WCWK]
                         ,[KPI_NAME]
                         ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                         end,'N2')
                         ,[FAIL_WCWK]
                         ,[pKPI_WCWKENDS]
                         ,[FAIL_WCWKENDS]
                         ,[TypeOfHit]
                         ,[RAN_OPERATION]
                         ,[RAN_STATUS]
                         ,[IM_FO]
                         ,[IM_FO_STATUS]
                         ,[RAN_REMARK]
                         ,[RAN_REMARK_HIST]
                         ,[PROBLEM_CAT]
                         ,[SHORT_TERM_SOLUTION]
                         ,[CR_NUMBER]
                         ,[CR_STATUS]
                         ,[SHORT_TERM_TARGET_WK]
                         ,[MID_TERM_SOLUTION]
                         ,[MID_TERM_SOLUTION_STATUS]
                         ,[MID_TERM_TARGET_MONTH]
                         ,[LONG_TERM_SOLUTION]
                         ,[LONG_TERM_SOLUTION_STATUS]
                         ,[LONG_TERM_TARGET_MONTH]
                         ,[REMARK]
                         ,[name_t]
                         ,[GRADE]
                         ,[NAME_E] as sitecodeeng
                         ,[KPI_ID]
                         ,[CELL_ID]
                          FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1=1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
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
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);
        }
        else if (overDueType == "STNoTarget")
        {
            sb.Clear();
            sb.AppendLine(@"SELECT[newComming]
                         ,[PropostToClose_status]
                         ,[WC_COUNT]
                         ,[IM]
                         ,[WK]
                         ,[REGION]
                         ,[SYSTEM]
                         ,[cellName]
                         ,[sitecode]
                         ,[no_Of_kpi]
                         ,[CLUSTER]
                         ,[NPS]
                         ,[SERVERITY]
                         ,[COUNTDAY_WCWK]
                         ,[KPI_NAME]
                         ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                          when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                          when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                          end,'N2')
                         ,[FAIL_WCWK]
                         ,[pKPI_WCWKENDS]
                         ,[FAIL_WCWKENDS]
                         ,[TypeOfHit]
                         ,[RAN_OPERATION]
                         ,[RAN_STATUS]
                         ,[IM_FO]
                         ,[IM_FO_STATUS]
                         ,[RAN_REMARK]
                         ,[RAN_REMARK_HIST]
                         ,[PROBLEM_CAT]
                         ,[SHORT_TERM_SOLUTION]
                         ,[CR_NUMBER]
                         ,[CR_STATUS]
                         ,[SHORT_TERM_TARGET_WK]
                         ,[MID_TERM_SOLUTION]
                         ,[MID_TERM_SOLUTION_STATUS]
                         ,[MID_TERM_TARGET_MONTH]
                         ,[LONG_TERM_SOLUTION]
                         ,[LONG_TERM_SOLUTION_STATUS]
                         ,[LONG_TERM_TARGET_MONTH]
                         ,[REMARK]
                         ,[name_t]
                         ,[GRADE]
                         ,[NAME_E] as sitecodeeng
                         ,[KPI_ID]
                         ,[CELL_ID]
                          FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1 = 1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
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
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);
        }
        else if (overDueType == "STNoCR")
        {
            sb.Clear();
            sb.AppendLine(@"SELECT[newComming]
                         ,[PropostToClose_status]
                         ,[WC_COUNT]
                         ,[IM]
                         ,[WK]
                         ,[REGION]
                         ,[SYSTEM]
                         ,[cellName]
                         ,[sitecode]
                         ,[no_Of_kpi]
                         ,[CLUSTER]
                         ,[NPS]
                         ,[SERVERITY]
                         ,[COUNTDAY_WCWK]
                         ,[KPI_NAME]
                         ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                         end,'N2')
                         ,[FAIL_WCWK]
                         ,[pKPI_WCWKENDS]
                         ,[FAIL_WCWKENDS]
                         ,[TypeOfHit]
                         ,[RAN_OPERATION]
                         ,[RAN_STATUS]
                         ,[IM_FO]
                         ,[IM_FO_STATUS]
                         ,[RAN_REMARK]
                         ,[RAN_REMARK_HIST]
                         ,[PROBLEM_CAT]
                         ,[SHORT_TERM_SOLUTION]
                         ,[CR_NUMBER]
                         ,[CR_STATUS]
                         ,[SHORT_TERM_TARGET_WK]
                         ,[MID_TERM_SOLUTION]
                         ,[MID_TERM_SOLUTION_STATUS]
                         ,[MID_TERM_TARGET_MONTH]
                         ,[LONG_TERM_SOLUTION]
                         ,[LONG_TERM_SOLUTION_STATUS]
                         ,[LONG_TERM_TARGET_MONTH]
                         ,[REMARK]
                         ,[name_t]
                         ,[GRADE]
                         ,[NAME_E] as sitecodeeng
                         ,[KPI_ID]
                         ,[CELL_ID]
                          FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1 = 1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
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
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);
        }
        else if (overDueType == "LTNoTarget")
        {
            sb.Clear();
            sb.AppendLine(@"SELECT[newComming]
                         ,[PropostToClose_status]
                         ,[WC_COUNT]
                         ,[IM]
                         ,[WK]
                         ,[REGION]
                         ,[SYSTEM]
                         ,[cellName]
                         ,[sitecode]
                         ,[no_Of_kpi]
                         ,[CLUSTER]
                         ,[NPS]
                         ,[SERVERITY]
                         ,[COUNTDAY_WCWK]
                         ,[KPI_NAME]
                         ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                         end,'N2')
                         ,[FAIL_WCWK]
                         ,[pKPI_WCWKENDS]
                         ,[FAIL_WCWKENDS]
                         ,[TypeOfHit]
                         ,[RAN_OPERATION]
                         ,[RAN_STATUS]
                         ,[IM_FO]
                         ,[IM_FO_STATUS]
                         ,[RAN_REMARK]
                         ,[RAN_REMARK_HIST]
                         ,[PROBLEM_CAT]
                         ,[SHORT_TERM_SOLUTION]
                         ,[CR_NUMBER]
                         ,[CR_STATUS]
                         ,[SHORT_TERM_TARGET_WK]
                         ,[MID_TERM_SOLUTION]
                         ,[MID_TERM_SOLUTION_STATUS]
                         ,[MID_TERM_TARGET_MONTH]
                         ,[LONG_TERM_SOLUTION]
                         ,[LONG_TERM_SOLUTION_STATUS]
                         ,[LONG_TERM_TARGET_MONTH]
                         ,[REMARK]
                         ,[name_t]
                         ,[GRADE]
                         ,[NAME_E] as sitecodeeng
                         ,[KPI_ID]
                         ,[CELL_ID]
                          FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1 = 1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
            sb.AppendLine("AND[PROBLEM_CAT] <> 'Under_investigation'");
            sb.AppendLine("AND[LONG_TERM_SOLUTION] is not null");
            sb.AppendLine("AND[LONG_TERM_SOLUTION] <> ''");
            sb.AppendLine("AND[LONG_TERM_SOLUTION] <> '-'");
            sb.AppendLine("AND[LONG_TERM_SOLUTION] <> '0'");
            sb.AppendLine("AND[LONG_TERM_SOLUTION] not like '%under%'");
            sb.AppendLine("AND([LONG_TERM_TARGET_MONTH] is null OR[LONG_TERM_TARGET_MONTH] = '-')");
            sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
            sb.AppendLine("Order by WK,IM");
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);
        }
        else if (overDueType == "NoAction")
        {
            sb.Clear();
            sb.AppendLine(@"SELECT[newComming]
                         ,[PropostToClose_status]
                         ,[WC_COUNT]
                         ,[IM]
                         ,[WK]
                         ,[REGION]
                         ,[SYSTEM]
                         ,[cellName]
                         ,[sitecode]
                         ,[no_Of_kpi]
                         ,[CLUSTER]
                         ,[NPS]
                         ,[SERVERITY]
                         ,[COUNTDAY_WCWK]
                         ,[KPI_NAME]
                         ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
                          when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
                          when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
                          end,'N2')
                         ,[FAIL_WCWK]
                         ,[pKPI_WCWKENDS]
                         ,[FAIL_WCWKENDS]
                         ,[TypeOfHit]
                         ,[RAN_OPERATION]
                         ,[RAN_STATUS]
                         ,[IM_FO]
                         ,[IM_FO_STATUS]
                         ,[RAN_REMARK]
                         ,[RAN_REMARK_HIST]
                         ,[PROBLEM_CAT]
                         ,[SHORT_TERM_SOLUTION]
                         ,[CR_NUMBER]
                         ,[CR_STATUS]
                         ,[SHORT_TERM_TARGET_WK]
                         ,[MID_TERM_SOLUTION]
                         ,[MID_TERM_SOLUTION_STATUS]
                         ,[MID_TERM_TARGET_MONTH]
                         ,[LONG_TERM_SOLUTION]
                         ,[LONG_TERM_SOLUTION_STATUS]
                         ,[LONG_TERM_TARGET_MONTH]
                         ,[REMARK]
                         ,[name_t]
                         ,[GRADE]
                         ,[NAME_E] as sitecodeeng
                         ,[KPI_ID]
                         ,[CELL_ID]
                          FROM[dbo].[V_WCL_EXPORT_EXCEL]");
            sb.AppendLine("where 1 = 1");
            if (Region == "NationWide") { }
            else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
            else { sb.AppendLine("and REGION = '" + Region + "'"); }
            sb.AppendLine("and[PROBLEM_CAT] = 'Under_investigation'");
            sb.AppendLine("OR[PROBLEM_CAT] is null");
            sb.AppendLine("OR[PROBLEM_CAT] = ''");
            sb.AppendLine("OR[PROBLEM_CAT] = '-'");
            sb.AppendLine("AND SUBSTRING(WK,3, 2) <> DATEPART(WK, getdate())");
            sb.AppendLine("Order by WK,IM");
            dt = new DataTable();
            dt = conn.getDataTabale(sb.ToString(), connectionString);
            JsonResult = conn.ConvertDataTableTojSonString(dt);
        }
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getMobileType(string Region, string MobileType, string KnowIssue, string ClosedIM, string CellAvailability)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"SELECT[newComming]
        ,[PropostToClose_status]
        ,[WC_COUNT]
        ,[IM]
        ,[WK]
        ,[REGION]
        ,[SYSTEM]
        ,[cellName]
        ,[sitecode]
        ,[no_Of_kpi]
        ,[cluster]
        ,[NPS]
        ,[serverity]
        ,[countday_wcwk]
        ,[KPI_NAME]
        ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
         end,'N2')
        ,[FAIL_WCWK]
        ,[pKPI_WCWKENDS]
        ,[FAIL_WCWKENDS]
        ,[TypeOfHit]
        ,[RAN_OPERATION]
        ,[RAN_STATUS]
        ,[IM_FO]
        ,[IM_FO_STATUS]
        ,[RAN_REMARK]
        ,[RAN_REMARK_HIST]
        ,[PROBLEM_CAT]
        ,[SHORT_TERM_SOLUTION]
        ,[CR_NUMBER]
        ,[CR_STATUS]
        ,[SHORT_TERM_TARGET_WK]
        ,[MID_TERM_SOLUTION]
        ,[MID_TERM_SOLUTION_STATUS]
        ,[MID_TERM_TARGET_MONTH]
        ,[LONG_TERM_SOLUTION]
        ,[LONG_TERM_SOLUTION_STATUS]
        ,[LONG_TERM_TARGET_MONTH]
        ,[REMARK]
        ,[NAME_T]
        ,[NAME_E] as sitecodeeng
        ,[KPI_ID]
        ,[CELL_ID]");
        if (!string.IsNullOrEmpty(KnowIssue)) { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL_KNOWN_ISSUES]"); }
        else if (!string.IsNullOrEmpty(ClosedIM)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CLOSED]"); }
        else if (!string.IsNullOrEmpty(CellAvailability)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CELL_AVAIL]"); }
        else { sb.AppendLine("FROM[dbo].[V_WCL_EXPORT_EXCEL]"); }

        sb.AppendLine("WHERE 1=1 ");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("and REGION = '" + Region + "'"); }
        if (MobileType == "All") { }
        else { sb.AppendLine(" and SYSTEM = '" + MobileType.Trim() + "'"); }

        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string getPendingCount()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
        SELECT [Pending]
        ,[BMA]
        ,[Central & East]
        ,[North]
        ,[NorthEast]
        ,[South & West]
        FROM [dbo].[V_WCL_PENDING_COUNT] 
		");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetExcelStatus(string userName)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
                SELECT    [CODENAME]
         ,[DATE_EXPORT]
		 ,[IMPORT_FILE_NAME]
         ,[DATE_IMPORT_New]  = CONVERT(VARCHAR(10),DATE_IMPORT,101)
        
	     ,PERCENT_COMPLETE = convert(float,ISNULL([UPDATE_ROW_COMPLETE],0)) / 
	     convert(float,ISNULL([UPDATE_ROW_COUNT],0))*100
	     ,PROGRESS =convert(varchar,
	     convert(float,ISNULL([UPDATE_ROW_COMPLETE],0)) / 
	     convert(float,ISNULL([UPDATE_ROW_COUNT],0))*100
	      )+' % '
		 ,[ROW]=[UPDATE_ROW_COUNT]
	     ,COMPLETE=[UPDATE_ROW_COMPLETE]
		 ,[LOGIN_NAME_EXPORT]
         ,[LOGIN_NAME_IMPORT]
         ,[DATETIME_IMPORT_TO_DB]
         ,[DATETIME_IMPORT_FINISH]
         ,[EXPORT_FILE_NAME]
		 
         FROM [dbo].[WCL_EXCEL_VERSION]
         WHERE
         UPDATE_ROW_COUNT <> UPDATE_ROW_COMPLETE 
         AND LOGIN_NAME_IMPORT = '" + userName + "' order by DATE_IMPORT_New DESC ");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetExcelStatusComplete(string userName)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
        SELECT TOP(10) [CODENAME]
         ,[DATE_EXPORT]
		 ,[IMPORT_FILE_NAME]
         ,[DATE_IMPORT_New]  = CONVERT(VARCHAR(10),DATE_IMPORT,101)
        
	     ,PERCENT_COMPLETE = convert(float,ISNULL([UPDATE_ROW_COMPLETE],0)) / 
	     convert(float,ISNULL([UPDATE_ROW_COUNT],0))*100
	     ,PROGRESS =convert(varchar,
	     convert(float,ISNULL([UPDATE_ROW_COMPLETE],0)) / 
	     convert(float,ISNULL([UPDATE_ROW_COUNT],0))*100
	      )+' % '
		 ,[ROW]=[UPDATE_ROW_COUNT]
	     ,COMPLETE=[UPDATE_ROW_COMPLETE]
		 ,[LOGIN_NAME_EXPORT]
         ,[LOGIN_NAME_IMPORT]
         ,[DATETIME_IMPORT_TO_DB]
         ,[DATETIME_IMPORT_FINISH]
         ,[EXPORT_FILE_NAME]
		 
         FROM [dbo].[WCL_EXCEL_VERSION]
         WHERE
         UPDATE_ROW_COUNT = UPDATE_ROW_COMPLETE 
         and LOGIN_NAME_IMPORT = '" + userName + "' order by DATE_IMPORT_New DESC ");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetKnowIssue(string Region)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
       SELECT [newComming]
      ,[PropostToClose_status]
      ,[WC_COUNT]
      ,[IM]
      ,[WK]
      ,[REGION]
      ,[SYSTEM]
      ,[cellName]
      ,[sitecode]
      ,[no_Of_kpi]
      ,[CLUSTER]
      ,[NPS]
      ,[SERVERITY]
      ,[COUNTDAY_WCWK]
      ,[KPI_NAME]
      ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
         end,'N2')
      ,[FAIL_WCWK]
      ,[pKPI_WCWKENDS]
      ,[FAIL_WCWKENDS]
      ,[TypeOfHit]
      ,[RAN_OPERATION]
      ,[RAN_STATUS]
      ,[IM_FO]
      ,[IM_FO_STATUS]
      ,[RAN_REMARK]
      ,[RAN_REMARK_HIST]
      ,[PROBLEM_CAT]
      ,[SHORT_TERM_SOLUTION]
      ,[CR_NUMBER]
      ,[CR_STATUS]
      ,[SHORT_TERM_TARGET_WK]
      ,[MID_TERM_SOLUTION]
      ,[MID_TERM_SOLUTION_STATUS]
      ,[MID_TERM_TARGET_MONTH]
      ,[LONG_TERM_SOLUTION]
      ,[LONG_TERM_SOLUTION_STATUS]
      ,[LONG_TERM_TARGET_MONTH]
      ,[REMARK]
      ,[name_t]
      ,[GRADE]
      ,[NAME_E] as sitecodeeng
      ,[KPI_ID]
      ,[CELL_ID]
       FROM [dbo].[V_WCL_EXPORT_EXCEL_KNOWN_ISSUES]
        ");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("WHERE SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("WHERE REGION = '" + Region + "'"); }
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetClosedIM(string Region)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
       SELECT [newComming]
      ,[PropostToClose_status]
      ,[WC_COUNT]
      ,[IM]
      ,[WK]
      ,[REGION]
      ,[SYSTEM]
      ,[cellName]
      ,[sitecode]
      ,[no_Of_kpi]
      ,[CLUSTER]
      ,[NPS]
      ,[SERVERITY]
      ,[COUNTDAY_WCWK]
      ,[KPI_NAME]
      ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
         end,'N2')
      ,[FAIL_WCWK]
      ,[pKPI_WCWKENDS]
      ,[FAIL_WCWKENDS]
      ,[TypeOfHit]
      ,[RAN_OPERATION]
      ,[RAN_STATUS]
      ,[IM_FO]
      ,[IM_FO_STATUS]
      ,[RAN_REMARK]
      ,[RAN_REMARK_HIST]
      ,[PROBLEM_CAT]
      ,[SHORT_TERM_SOLUTION]
      ,[CR_NUMBER]
      ,[CR_STATUS]
      ,[SHORT_TERM_TARGET_WK]
      ,[MID_TERM_SOLUTION]
      ,[MID_TERM_SOLUTION_STATUS]
      ,[MID_TERM_TARGET_MONTH]
      ,[LONG_TERM_SOLUTION]
      ,[LONG_TERM_SOLUTION_STATUS]
      ,[LONG_TERM_TARGET_MONTH]
      ,[REMARK]
      ,[name_t]
      ,[GRADE]
      ,[NAME_E] as sitecodeeng
      ,[KPI_ID]
      ,[CELL_ID]
       FROM [dbo].[V_WCL_EXPORT_EXCEL_CLOSED]
        ");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("WHERE SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("WHERE REGION = '" + Region + "'"); }
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetHardwareIssue(string Region)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();
        sb.AppendLine(@"
       SELECT [newComming]
      ,[PropostToClose_status]
      ,[WC_COUNT]
      ,[IM]
      ,[WK]
      ,[REGION]
      ,[SYSTEM]
      ,[cellName]
      ,[sitecode]
      ,[no_Of_kpi]
      ,[CLUSTER]
      ,[NPS]
      ,[SERVERITY]
      ,[COUNTDAY_WCWK]
      ,[KPI_NAME]
      ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
         end,'N2')
      ,[FAIL_WCWK]
      ,[pKPI_WCWKENDS]
      ,[FAIL_WCWKENDS]
      ,[TypeOfHit]
      ,[RAN_OPERATION]
      ,[RAN_STATUS]
      ,[IM_FO]
      ,[IM_FO_STATUS]
      ,[RAN_REMARK]
      ,[RAN_REMARK_HIST]
      ,[PROBLEM_CAT]
      ,[SHORT_TERM_SOLUTION]
      ,[CR_NUMBER]
      ,[CR_STATUS]
      ,[SHORT_TERM_TARGET_WK]
      ,[MID_TERM_SOLUTION]
      ,[MID_TERM_SOLUTION_STATUS]
      ,[MID_TERM_TARGET_MONTH]
      ,[LONG_TERM_SOLUTION]
      ,[LONG_TERM_SOLUTION_STATUS]
      ,[LONG_TERM_TARGET_MONTH]
      ,[REMARK]
      ,[name_t]
      ,[GRADE]
      ,[NAME_E] as sitecodeeng
      ,[KPI_ID]
      ,[CELL_ID]
       FROM [dbo].[V_WCL_EXPORT_EXCEL]
       WHERE 1=1
        ");
        if (Region == "NationWide") { }
        else if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
        else { sb.AppendLine("AND REGION = '" + Region + "'"); }
        sb.AppendLine("AND PROBLEM_CAT = 'Hardware_Issues'");
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetMockUpRegion(string Region, string KnowIssue, string ClosedIM, string CellAvailability, string ProblemCat)//(string region, string startFrom, string finishDate, string search, string highlight)
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();

         sb.AppendLine(@"SELECT[newComming]
        ,[PropostToClose_status]
        ,[WC_COUNT]
        ,[IM]
        ,[WK]
        ,[REGION]
        ,[SYSTEM]
        ,[cellName]
        ,[sitecode]
        ,[no_Of_kpi]
        ,[cluster]
        ,[NPS]
        ,[SERVERITY]
        ,[countday_wcwk]
        ,[KPI_NAME]
        ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
         when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
         when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
         end,'N2')
        ,[FAIL_WCWK]
        ,[pKPI_WCWKENDS]
        ,[FAIL_WCWKENDS]
        ,[TypeOfHit]
        ,[RAN_OPERATION]
        ,[RAN_STATUS]
        ,[IM_FO]
        ,[IM_FO_STATUS]
        ,[RAN_REMARK]
        ,[RAN_REMARK_HIST]
        ,[PROBLEM_CAT]
        ,[SHORT_TERM_SOLUTION]
        ,[CR_NUMBER]
        ,[CR_STATUS]
        ,[SHORT_TERM_TARGET_WK]
        ,[MID_TERM_SOLUTION]
        ,[MID_TERM_SOLUTION_STATUS]
        ,[MID_TERM_TARGET_MONTH]
        ,[LONG_TERM_SOLUTION]
        ,[LONG_TERM_SOLUTION_STATUS]
        ,[LONG_TERM_TARGET_MONTH]
        ,[REMARK]
        ,[NAME_T]
        ,[NAME_E] as sitecodeeng
        ,[KPI_ID]
        ,[CELL_ID]");
        if (!string.IsNullOrEmpty(KnowIssue)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_KNOWN_ISSUES]"); }
        else if (!string.IsNullOrEmpty(ClosedIM)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CLOSED]"); }
        else if (!string.IsNullOrEmpty(CellAvailability)) { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL_CELL_AVAIL]"); }
        else { sb.AppendLine("FROM [dbo].[V_WCL_EXPORT_EXCEL]"); }

        sb.AppendLine("WHERE 1=1");
        if (Region == "NationWide") {  }
        if (Region == "NationWide" && ProblemCat != "Unknown" && !string.IsNullOrEmpty(ProblemCat)) { sb.AppendLine("AND PROBLEM_CAT = '" + ProblemCat + "' "); }
        if (Region == "VIP") { sb.AppendLine("AND SERVERITY = '" + Region + "'"); }
        //if (!string.IsNullOrEmpty(ProblemCat)) { sb.AppendLine("AND  PROBLEM_CAT = '" + ProblemCat + "'"); }
        if (!string.IsNullOrEmpty(ProblemCat) && ProblemCat == "Unknown") { sb.AppendLine("AND  PROBLEM_CAT is null"); }
        if (Region != "NationWide" && Region != "VIP" && ProblemCat != "Unknown" && !string.IsNullOrEmpty(ProblemCat)) { sb.AppendLine("AND PROBLEM_CAT = '" + ProblemCat + "' "); }
        if (Region != "NationWide" && Region != "VIP") { sb.AppendLine("AND REGION = '" + Region + "'"); }

       
        
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);

        return JsonResult;
    }
    public string UpdateMockUpMultiData(string dataJson)
    {
        string ss = JsonConvert.SerializeObject(dataJson);
        Boolean result = false;
        string numResult = "";
        MockUp[] dictxx = JsonConvert.DeserializeObject<MockUp[]>(dataJson);

        foreach (MockUp mData in dictxx)
        {
            string cellId = mData.cellId;
            string kpiId = mData.kpiId;
            string countDay = mData.countDay;
        }
        return numResult;
    }
    public string GetLastUpdate()
    {
        string result = "2015-08-13 11:51:38";
        return result;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string UpdateSingleWC
        (string IM
        , string RAN_OPERATION
        , string RAN_STATUS
        , string IM_FO
        , string RAN_REMARK
        , string PROBLEM_CAT
        , string SHORT_TERM_SOLUTION
        , string CR_NUMBER
        , string CR_STATUS
        , string SHORT_TERM_TARGET_WK
        , string MID_TERM_SOLUTION
        , string MID_TERM_SOLUTION_STATUS
        , string MID_TERM_TARGET_MONTH
        , string LONG_TERM_SOLUTION
        , string LONG_TERM_SOLUTION_STATUS
        , string LONG_TERM_TARGET_MONTH
        , string REMARK
        , string LoginName
        , string[] ArrIM
        , string KPI2G
        , string KPI3GU08
        , string KPI3GU21
        , string KPI4GL18
        , string KPI4GL21
        , string WK
        , string KPI_ID
        , string CELL_ID
        )
    {
        Boolean result1 = false;
        Boolean result2 = false;
        Boolean insertHistory = false;
        ArrayList imList = new ArrayList();

        //Check IM in view
        /* if (!string.IsNullOrEmpty(KPI2G))
         {
             foreach (var imCheckList in ArrIM)
             {
                 string[] combindID = imCheckList.Split(',');

                 StringBuilder innerSb = new StringBuilder();
                 DBConnection innerDb = new DBConnection();
                 innerSb.Clear();
                 innerSb.AppendLine("select");
                 innerSb.AppendLine("[SYSTEM]");
                 innerSb.AppendLine("from[dbo].[V_WCL_EXPORT_EXCEL]");
                 innerSb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                 innerSb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                 innerSb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                 DataTable innerDT = new DataTable();
                 innerDT = innerDb.getDataTabale(innerSb.ToString(), connectionString);
                 if (innerDT.Rows[0][0].ToString() == "2G")
                 {
                     imList.Add(imCheckList);
                 }
             }
         }
         if (!string.IsNullOrEmpty(KPI3GU08))
         {
             foreach (var imCheckList in ArrIM)
             {
                 string[] combindID = imCheckList.Split(',');

                 StringBuilder innerSb = new StringBuilder();
                 DBConnection innerDb = new DBConnection();
                 innerSb.Clear();
                 innerSb.AppendLine("select");
                 innerSb.AppendLine("cellName");
                 innerSb.AppendLine("from[dbo].[V_WCL_EXPORT_EXCEL]");
                 innerSb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                 innerSb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                 innerSb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                 DataTable innerDT = new DataTable();
                 innerDT = innerDb.getDataTabale(innerSb.ToString(), connectionString);
                 if (innerDT.Rows[0][0].ToString().Substring(0, 3) == "U08")
                 {
                     imList.Add(imCheckList);
                 }
             }
         }
         if (!string.IsNullOrEmpty(KPI3GU21))
         {
             foreach (var imCheckList in ArrIM)
             {
                 string[] combindID = imCheckList.Split(',');

                 StringBuilder innerSb = new StringBuilder();
                 DBConnection innerDb = new DBConnection();
                 innerSb.Clear();
                 innerSb.AppendLine("select");
                 innerSb.AppendLine("cellName");
                 innerSb.AppendLine("from[dbo].[V_WCL_EXPORT_EXCEL]");
                 innerSb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                 innerSb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                 innerSb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                 DataTable innerDT = new DataTable();
                 innerDT = innerDb.getDataTabale(innerSb.ToString(), connectionString);
                 if (innerDT.Rows[0][0].ToString().Substring(0, 3) == "U21")
                 {
                     imList.Add(imCheckList);
                 }
             }
         }
         if (!string.IsNullOrEmpty(KPI4GL18))
         {
             foreach (var imCheckList in ArrIM)
             {
                 string[] combindID = imCheckList.Split(',');

                 StringBuilder innerSb = new StringBuilder();
                 DBConnection innerDb = new DBConnection();
                 innerSb.Clear();
                 innerSb.AppendLine("select");
                 innerSb.AppendLine("cellName");
                 innerSb.AppendLine("from[dbo].[V_WCL_EXPORT_EXCEL]");
                 innerSb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                 innerSb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                 innerSb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                 DataTable innerDT = new DataTable();
                 innerDT = innerDb.getDataTabale(innerSb.ToString(), connectionString);
                 if (innerDT.Rows[0][0].ToString().Substring(0, 3) == "L18")
                 {
                     imList.Add(imCheckList);
                 }
             }
         }
         if (!string.IsNullOrEmpty(KPI4GL21))
         {
             foreach (var imCheckList in ArrIM)
             {
                 string[] combindID = imCheckList.Split(',');

                 StringBuilder innerSb = new StringBuilder();
                 DBConnection innerDb = new DBConnection();
                 innerSb.Clear();
                 innerSb.AppendLine("select");
                 innerSb.AppendLine("cellName");
                 innerSb.AppendLine("from[dbo].[V_WCL_EXPORT_EXCEL]");
                 innerSb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                 innerSb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                 innerSb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                 DataTable innerDT = new DataTable();
                 innerDT = innerDb.getDataTabale(innerSb.ToString(), connectionString);
                 if (innerDT.Rows[0][0].ToString().Substring(0, 3) == "L21")
                 {
                     imList.Add(imCheckList);
                 }
             }
         }*/

        //First insert remark
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();

        sb.Clear();
        sb.AppendLine("select");
        sb.AppendLine("REMARK = ISNULL(REMARK,'')");
        sb.AppendLine("from[dbo].[WCL_REMARK]");
        sb.AppendLine("where WK = '@WK'".Replace("@WK", WK));
        sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", CELL_ID));
        sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", KPI_ID));

        DataTable dt = new DataTable();
        dt = db.getDataTabale(sb.ToString(), connectionString);

        var result = "";
        if (dt.Rows.Count != 0)
        {
            result = dt.Rows[0][0].ToString();
        }
        if (result.ToString().Trim() != REMARK.ToString().Trim() && !string.IsNullOrEmpty(REMARK))
        {
            sb.Clear();
            sb.AppendLine(@"SELECT
                            ITEM_ID = MAX(ITEM_ID)
                            FROM WCL_REMARK
                            WHERE WK = '@WK' ".Replace("@WK", WK));
            sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", CELL_ID));
            sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", KPI_ID));
            dt = db.getDataTabale(sb.ToString(), connectionString);
            var maxID = int.Parse(dt.Rows[0][0].ToString());
            int newMaxID = maxID + 1;


            sb.Clear();
            sb.AppendLine("INSERT INTO[dbo].[WCL_REMARK]");
            sb.AppendLine("([WK]");
            sb.AppendLine(",[CELL_ID]");
            sb.AppendLine(",[KPI_ID]");
            sb.AppendLine(",[ITEM_ID]");
            sb.AppendLine(",[DATETIME_ID]");
            sb.AppendLine(",[REMARK]");
            sb.AppendLine(",[LOGIN_NAME])");
            sb.AppendLine("VALUES");
            sb.AppendLine("('" + WK + "'");
            sb.AppendLine(",'" + CELL_ID + "'");
            sb.AppendLine(",'" + KPI_ID + "'");
            sb.AppendLine("," + newMaxID + " ");
            sb.AppendLine(", GETDATE()");
            sb.AppendLine(", '" + REMARK.ToString().Trim() + "'");
            sb.AppendLine(", '" + LoginName.Trim() + "')");
            insertHistory = db.SaveData(sb.ToString(), connectionString);
        }
        //End of first insert remark

        //Start Insert Multiple Remark
        foreach (var imGroup in ArrIM)
        {
            string changeID = imGroup.ToString();
            string[] combindID = changeID.Split(',');
            string compareKey = WK + ',' + CELL_ID + ',' + KPI_ID;
            if (imGroup.ToString() != compareKey)
            {
                sb.Clear();
                sb.AppendLine("select");
                sb.AppendLine("REMARK = ISNULL(REMARK,'')");
                sb.AppendLine("from[dbo].[WCL_REMARK]");
                sb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
                sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));

                dt.Clear();
                dt = db.getDataTabale(sb.ToString(), connectionString);

                result = "";
                if (dt.Rows.Count != 0)
                {
                    result = dt.Rows[0][0].ToString();
                }
                if (result.ToString().Trim() != REMARK.ToString().Trim() && !string.IsNullOrEmpty(REMARK))
                {
                    sb.Clear();
                    sb.AppendLine(@"SELECT
                            ITEM_ID = MAX(ITEM_ID)
                            FROM WCL_REMARK
                            WHERE WK = '@WK' ".Replace("@WK", combindID[0]));
                    sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
                    sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));
                    dt = db.getDataTabale(sb.ToString(), connectionString);
                    var maxID = int.Parse(dt.Rows[0][0].ToString());
                    int newMaxID = maxID + 1;


                    sb.Clear();
                    sb.AppendLine("INSERT INTO[dbo].[WCL_REMARK]");
                    sb.AppendLine("([WK]");
                    sb.AppendLine(",[CELL_ID]");
                    sb.AppendLine(",[KPI_ID]");
                    sb.AppendLine(",[ITEM_ID]");
                    sb.AppendLine(",[DATETIME_ID]");
                    sb.AppendLine(",[REMARK]");
                    sb.AppendLine(",[LOGIN_NAME])");
                    sb.AppendLine("VALUES");
                    sb.AppendLine("('" + combindID[0] + "'");
                    sb.AppendLine(",'" + combindID[1] + "'");
                    sb.AppendLine(",'" + combindID[2] + "'");
                    sb.AppendLine("," + newMaxID + " ");
                    sb.AppendLine(", GETDATE()");
                    sb.AppendLine(", '" + REMARK.ToString().Trim() + "'");
                    sb.AppendLine(", '" + LoginName.Trim() + "')");
                    insertHistory = db.SaveData(sb.ToString(), connectionString);
                }
            }
        }
        //End of Multiple Remark
        sb.Clear();
        sb.AppendLine("UPDATE[dbo].[WCL_MAP_IM]");
        sb.AppendLine("SET[RAN_STATUS] = '" + RAN_STATUS.ToString().Trim() + "'");
        sb.AppendLine(",[RAN_OPERATION] = '" + RAN_OPERATION.Trim() + "'");
        sb.AppendLine(",[IM_FO] = '" + IM_FO.Trim() + "'");
        sb.AppendLine("WHERE WK = '@WK'".Replace("@WK", WK));
        sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", CELL_ID));
        sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", KPI_ID));
        result1 = db.SaveData(sb.ToString(), connectionString);

        foreach (var imGroup in ArrIM)
        {
            string changeID = imGroup.ToString();
            string[] combindID = changeID.Split(',');

            sb.Clear();
            sb.AppendLine("UPDATE[dbo].[WCL_MAP_IM]");
            sb.AppendLine("SET[RAN_STATUS] = '" + RAN_STATUS.ToString().Trim() + "'");
            sb.AppendLine(",[RAN_OPERATION] = '" + RAN_OPERATION.Trim() + "'");
            sb.AppendLine(",[IM_FO] = '" + IM_FO.Trim() + "'");
            sb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
            sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
            sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));
            result1 = db.SaveData(sb.ToString(), connectionString);
        }



        sb.Clear();
        sb.AppendLine("UPDATE[dbo].[WCL_MAP_IM] SET");
        sb.AppendLine("[PROBLEM_CAT] = '" + PROBLEM_CAT.Trim() + "'");
        sb.AppendLine(",[SHORT_TERM_SOLUTION] = '" + SHORT_TERM_SOLUTION.Trim() + "'");
        sb.AppendLine(",[CR_NUMBER] = '" + CR_NUMBER.Trim() + "'");
        sb.AppendLine(",[CR_STATUS] = '" + CR_STATUS.Trim() + "'");
        sb.AppendLine(",[SHORT_TERM_TARGET_WK] = '" + SHORT_TERM_TARGET_WK.Trim() + "'");
        sb.AppendLine(",[MID_TERM_SOLUTION] = '" + MID_TERM_SOLUTION.Trim() + "'");
        sb.AppendLine(",[MID_TERM_SOLUTION_STATUS] = '" + MID_TERM_SOLUTION_STATUS.Trim() + "'");
        sb.AppendLine(",[MID_TERM_TARGET_MONTH] = '" + MID_TERM_TARGET_MONTH.Trim() + "'");
        sb.AppendLine(",[LONG_TERM_SOLUTION] = '" + LONG_TERM_SOLUTION.Trim() + "'");
        sb.AppendLine(",[LONG_TERM_SOLUTION_STATUS] = '" + LONG_TERM_SOLUTION_STATUS.Trim() + "'");
        sb.AppendLine(",[LONG_TERM_TARGET_MONTH] = '" + LONG_TERM_TARGET_MONTH.Trim() + "'");
        sb.AppendLine(",[REMARK] = '" + REMARK.Trim() + "'");
        sb.AppendLine("WHERE WK = '@WK'".Replace("@WK", WK));
        sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", CELL_ID));
        sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", KPI_ID));
        result2 = db.SaveData(sb.ToString(), connectionString);
        sb.Clear();


        foreach (var imGroup in ArrIM)
        {
            string changeID = imGroup.ToString();
            string[] combindID = changeID.Split(',');

            sb.Clear();
            sb.AppendLine("UPDATE[dbo].[WCL_MAP_IM] SET");
            sb.AppendLine("[PROBLEM_CAT] = '" + PROBLEM_CAT.Trim() + "'");
            sb.AppendLine(",[SHORT_TERM_SOLUTION] = '" + SHORT_TERM_SOLUTION.Trim() + "'");
            sb.AppendLine(",[CR_NUMBER] = '" + CR_NUMBER.Trim() + "'");
            sb.AppendLine(",[CR_STATUS] = '" + CR_STATUS.Trim() + "'");
            sb.AppendLine(",[SHORT_TERM_TARGET_WK] = '" + SHORT_TERM_TARGET_WK.Trim() + "'");
            sb.AppendLine(",[MID_TERM_SOLUTION] = '" + MID_TERM_SOLUTION.Trim() + "'");
            sb.AppendLine(",[MID_TERM_SOLUTION_STATUS] = '" + MID_TERM_SOLUTION_STATUS.Trim() + "'");
            sb.AppendLine(",[MID_TERM_TARGET_MONTH] = '" + MID_TERM_TARGET_MONTH.Trim() + "'");
            sb.AppendLine(",[LONG_TERM_SOLUTION] = '" + LONG_TERM_SOLUTION.Trim() + "'");
            sb.AppendLine(",[LONG_TERM_SOLUTION_STATUS] = '" + LONG_TERM_SOLUTION_STATUS.Trim() + "'");
            sb.AppendLine(",[LONG_TERM_TARGET_MONTH] = '" + LONG_TERM_TARGET_MONTH.Trim() + "'");
            sb.AppendLine(",[REMARK] = '" + REMARK.Trim() + "'");
            sb.AppendLine("where WK = '@WK'".Replace("@WK", combindID[0]));
            sb.AppendLine("AND CELL_ID = '@CELL_ID'".Replace("@CELL_ID", combindID[1]));
            sb.AppendLine("AND KPI_ID = '@KPI_ID'".Replace("@KPI_ID", combindID[2]));
            result2 = db.SaveData(sb.ToString(), connectionString);
            sb.Clear();
        }

        return "Updated";
    }
    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetHistory(string LoginName, string WK, string KPI_ID, string CELL_ID)
    {
        StringBuilder sb = new StringBuilder();
        DataTable dt = new DataTable();

        DBConnection db = new DBConnection();
        sb.AppendLine("SELECT");
        sb.AppendLine("[ITEM_ID]");
        sb.AppendLine(",DATETIME_ID_New = CONVERT(VARCHAR(100),DATETIME_ID,103)+' '+CONVERT(VARCHAR(100),DATETIME_ID,108)");
        //sb.AppendLine(",DATETIME_ID_New = DATETIME_ID");
        sb.AppendLine(",[REMARK]");
        sb.AppendLine(",[LOGIN_NAME]");
        sb.AppendLine("FROM[dbo].[WCL_REMARK] ");
        sb.AppendLine("where WK = '" + WK + "'");
        sb.AppendLine(" and KPI_ID='" + KPI_ID + "'");
        sb.AppendLine(" and CELL_ID='" + CELL_ID + "'");
        sb.AppendLine("order by DATETIME_ID DESC");

        dt = new DataTable();
        dt = db.getDataTabale(sb.ToString(), connectionString);
        JsonResult = db.ConvertDataTableTojSonString(dt);
        return JsonResult;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string Filter
        (string Region
        , string IM
        , string KnowIssue
        , string ClosedIM
        , string CellAvailability
        , string WK
        , string KPIName
        , string RAN_STATUS
        , string IM_FO
        , string sitecode
        , string NPS
        , string RAN_REMARK
        , string PROBLEM_CAT
        , string SHORT_TERM_SOLUTION
        , string CR_NUMBER
        , string CR_STATUS
        , string SHORT_TERM_TARGET_WK
        , string MID_TERM_SOLUTION
        , string MID_TERM_SOLUTION_STATUS
        , string MID_TERM_TARGET_MONTH
        , string LONG_TERM_SOLUTION
        , string LONG_TERM_SOLUTION_STATUS
        , string LONG_TERM_TARGET_MONTH
        , string KPIValueCompare
        , string SelectedOption
        )
    {
        StringBuilder sb = new StringBuilder();
        DBConnection conn = new DBConnection();

        sb.AppendLine(@"SELECT[newComming]
       ,[PropostToClose_status]
       ,[WC_COUNT]
       ,[IM]
       ,[WK]
       ,[REGION]
       ,[SYSTEM]
       ,[cellName]
       ,[sitecode]
       ,[no_Of_kpi]
       ,[cluster]
       ,[NPS]
       ,[serverity]
       ,[countday_wcwk]
       ,[KPI_NAME]
       ,pKPI_WCWK = FORMAT(case when TypeOfHit = 'Weekday' then pKPI_WCWK
        when TypeOfHit = 'Weekend' then pKPI_WCWKENDS
        when TypeOfHit = 'WholeWeek' then (pKPI_WCWK + pKPI_WCWKENDS) / 2
        end,'N2')
       ,[FAIL_WCWK]
       ,[pKPI_WCWKENDS]
       ,[FAIL_WCWKENDS]
       ,[TypeOfHit]
       ,[RAN_OPERATION]
       ,[RAN_STATUS]
       ,[IM_FO]
       ,[IM_FO_STATUS]
       ,[RAN_REMARK]
       ,[RAN_REMARK_HIST]
       ,[PROBLEM_CAT]
       ,[SHORT_TERM_SOLUTION]
       ,[CR_NUMBER]
       ,[CR_STATUS]
       ,[SHORT_TERM_TARGET_WK]
       ,[MID_TERM_SOLUTION]
       ,[MID_TERM_SOLUTION_STATUS]
       ,[MID_TERM_TARGET_MONTH]
       ,[LONG_TERM_SOLUTION]
       ,[LONG_TERM_SOLUTION_STATUS]
       ,[LONG_TERM_TARGET_MONTH]
       ,[REMARK]
       ,[NAME_T]
       ,[NAME_E] as sitecodeeng
       ,[KPI_ID]
       ,[CELL_ID]");

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
        if (!String.IsNullOrEmpty(sitecode))
        {
            sb.AppendLine(" and sitecode like '%" + sitecode + "%'");
        }
        if (!String.IsNullOrEmpty(NPS))
        {
            sb.AppendLine(" and NPS like '%" + NPS + "%'");
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
        dt = new DataTable();
        dt = conn.getDataTabale(sb.ToString(), connectionString);
        JsonResult = conn.ConvertDataTableTojSonString(dt);

        return JsonResult;
    }
}
