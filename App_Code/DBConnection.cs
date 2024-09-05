using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DBConnection
/// </summary>
public class DBConnection
{
    public DataTable dt;
    public SqlDataAdapter ad;
    public DBConnection()
    {
        //
        // TODO: Add constructor logic here
        //

    }
    public DataTable getDataTabale(string query, string connectionString)
    {
        dt = new DataTable();
        using (SqlConnection sc = new SqlConnection(connectionString))
        {
            try
            {
                sc.Open();
                ad = new SqlDataAdapter(query, sc);
                ad.Fill(dt);

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                sc.Close();
            }
            return dt;
        }
    }
    public Boolean SaveData(string sql, string connectionString)
    {
        using (SqlConnection sc = new SqlConnection(connectionString))
        {
            try
            {
                sc.Open();
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = sc;
                    command.CommandText = sql;
                    command.ExecuteNonQuery();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                sc.Close();
            }
        }

    }
    public String ConvertDataTableTojSonString(DataTable dataTable)
    {
        System.Web.Script.Serialization.JavaScriptSerializer serializer =
               new System.Web.Script.Serialization.JavaScriptSerializer();
        serializer.MaxJsonLength = Int32.MaxValue;
        List<Dictionary<String, Object>> tableRows = new List<Dictionary<String, Object>>();

        Dictionary<String, Object> row;

        foreach (DataRow dr in dataTable.Rows)
        {
            row = new Dictionary<String, Object>();
            foreach (DataColumn col in dataTable.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            tableRows.Add(row);
        }
        return serializer.Serialize(tableRows);
    }

}