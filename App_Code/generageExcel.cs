using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using OfficeOpenXml;
/// <summary>
/// Summary description for generageExcel
/// </summary>
public class generageExcel
{
	public  generageExcel()
	{
		   //'*** Create Excel.Application ***'
      
	}

  
    public static void WriteDataTable(ExcelWorksheet ews, DataTable dt)
    {
        WriteDataHeader(ews, dt);   //Write header.

        //Write rows.
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            WriteDataRow(ews, dt.Rows[i], i + 2);
        }
    }

    private static void WriteDataHeader(ExcelWorksheet ews, DataTable dt)
    {
        for (int i = 0; i < dt.Columns.Count; i++)
        {
            ews.Cells[1, i + 1].Value = dt.Columns[i].Caption;
        }
    }
    private static void WriteDataRow(ExcelWorksheet ews, DataRow row, int rowIndex)
    {
        for (int i = 0; i < row.Table.Columns.Count; i++)
        {
            ews.Cells[rowIndex, i + 1].Value = String.Format("{0}", row[i]);
        }
    }

}