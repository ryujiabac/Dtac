using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// Summary description for AccumulateCellAvailability
/// </summary>
public class AccumulateCellAvailability
{
    
    public string connectionString = ConfigurationManager.ConnectionStrings["ConnectionMockUp"].ConnectionString;
    public DataTable dt;

    public AccumulateCellAvailability()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    public int getNewCommingIM()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        sb.AppendLine(@"SELECT
                             Amount = count(*)
                             FROM [dbo].[WCL_MAP_IM]
                             where 
                             1=1
                             and wk = (select max(wk) from [dbo].[WCL_MAP_IM])
                             and im is null ");
        dt = new DataTable();
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());
        return result;
    }
    public int getAsOfWeek()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        sb.AppendLine(@"select
                        top(1) WK
                        from[dbo].[V_WCL_EXPORT_EXCEL_CELL_AVAIL]
                        order by WK DESC");
        dt = new DataTable();
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());
        return result;
    }
    public int getAccumulateNationWide()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();
        sb.AppendLine(this.GetSqlFromRegion("NationWide"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }

    public int getAccumulateNorth()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();
        sb.AppendLine(this.GetSqlFromRegion("North"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }
    public int getAccumulateBMA()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();

        sb.AppendLine(this.GetSqlFromRegion("BMA"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }
    public int getAccumulateCentralEast()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();

        sb.AppendLine(this.GetSqlFromRegion("Central & East"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }
    public int getAccumulateNorthEast()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();

        sb.AppendLine(this.GetSqlFromRegion("NorthEast"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }
    public int getAccumulateSouthWest()
    {
        StringBuilder sb = new StringBuilder();
        DBConnection db = new DBConnection();
        dt = new DataTable();

        sb.AppendLine(this.GetSqlFromRegion("South & West"));
        dt = db.getDataTabale(sb.ToString(), connectionString);
        var result = int.Parse(dt.Rows[0][0].ToString());

        return result;
    }
    private string GetSqlFromRegion(string region)
    {
        if (region == "NationWide")
        {
            return @"
		select
		Totoal_Rows = count(*)
		from V_WCL_EXPORT_EXCEL_CELL_AVAIL";
        }
        else
        {
            return @"
		select
		Totoal_Rows = count(*)
		from V_WCL_EXPORT_EXCEL_CELL_AVAIL
		where 
		REGION = '@Region' "
            .Replace("@Region", region);
        }
    }
}