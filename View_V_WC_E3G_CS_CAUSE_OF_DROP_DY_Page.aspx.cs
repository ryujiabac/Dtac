using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class View_V_WC_E3G_CS_CAUSE_OF_DROP_DY_Page : System.Web.UI.Page
{
    private string connectionString = @"Data Source=192.168.16.233;Initial Catalog=KPI_RAW;User ID=nmc;Password=dmedium";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            //string csvPath = "~/pivottable/json_files/";
            if (Request.QueryString["action"] == null)
            {


//                Dictionary<string, string> dictParams = new Dictionary<string, string>
//            {
//                { "E3GCSDrop", Request.QueryString["E3GCSDrop"] ?? "20" },
//                { "PE3GNeighborHODropDis", Request.QueryString["PE3GNeighborHODropDis"] ?? "50" }
//            };

//                DataTable dt = null;
//                StringBuilder sb = new StringBuilder();
//                DBConnection conn = new DBConnection();
//                sb.AppendFormat(@"
//        SELECT *
//        FROM V_WC_E3G_CS_CAUSE_OF_DROP_DY
//        WHERE [E3GCSDrop] > @E3GCSDrop
//        AND [PE3GNeighborHODropDis] > @PE3GNeighborHODropDis
//"
//    );
//                foreach (var obj in dictParams)
//                {
//                    sb.Replace("@" + obj.Key, obj.Value);
//                }



//                //Write datatable to json file.
//                string jsonFile = Server.MapPath(csvPath) + String.Format(@"\{0}.json", CreateMD5(sb.ToString()));

//                //if (!File.Exists(jsonFile))
//                {
//                    if (File.Exists(jsonFile)) File.Delete(jsonFile);

//                    //Get datatable from database.
//                    dt = conn.getDataTabale(sb.ToString(), this.connectionString);
//                    string jsonText = JsonConvert.SerializeObject(dt, Formatting.Indented);

//                    File.WriteAllText(jsonFile, jsonText);
//                }

//                //Redirect to show with pivottable.
//                string url = String.Format("~/pivottable/?json={0}&return={1}&{2}", Path.GetFileNameWithoutExtension(jsonFile),
//                    "../View_V_WC_E3G_CS_CAUSE_OF_DROP_DY_Page.aspx", this.GetParams(dictParams));
//                Response.Redirect(url);

                Response.Redirect("~/pivottable/");
            }
            else if (Request.QueryString["action"] == "MAIN_V_WC_E3G_CS_CAUSE_OF_DROP_DY")
            {

                int i_E3GCSDrop = 0;
                Int32.TryParse(Request.QueryString["E3GCSDrop"], out i_E3GCSDrop);
                int i_PE3GNeighborHODropDis = 0;
                Int32.TryParse(Request.QueryString["PE3GNeighborHODropDis"], out i_PE3GNeighborHODropDis);


                string result = this.GetV_WC_E3G_CS_CAUSE_OF_DROP_DYCellListJsonText(i_E3GCSDrop, i_PE3GNeighborHODropDis);

                Response.ContentType = "application/json";
                Response.Write(result);
                Response.End();
            }
            else if (Request.QueryString["action"] == "v_wc_e3g_cs_cause_of_drop_dy")
            {
                
                MemoryStream ms = new MemoryStream(Request.BinaryRead(Request.ContentLength));
                string jsonText = null;
                using (var sr = new StreamReader(ms))
                {
                    jsonText = sr.ReadToEnd();
                }

                //Convert payload to cell list.
                dynamic jsonObj = JsonConvert.DeserializeObject(jsonText);
                dynamic cellList = jsonObj.cellList;
                List<string> lstCellId = new List<string>();
                for (int i = 0; i < cellList.Count; i++)
                {
                    lstCellId.Add(cellList[i]["UtranCell"].Value);
                }
                

                string result = this.GetNeighborCellListJsonText(lstCellId.ToArray());
                Response.ContentType = "application/json";
                Response.Write(result);
                Response.End();
            }
            else if (Request.QueryString["action"] == "join_with_WC_E3G_HO_ADJ_NAME")
            {
                int i_E3GCSDrop = 0;
                Int32.TryParse(Request.QueryString["E3GCSDrop"], out i_E3GCSDrop);
                int i_PE3GNeighborHODropDis = 0;
                Int32.TryParse(Request.QueryString["PE3GNeighborHODropDis"], out i_PE3GNeighborHODropDis);


                string result = this.GetWC_E3G_HO_ADJ_NAMECellListJsonText(i_E3GCSDrop, i_PE3GNeighborHODropDis);
                Response.ContentType = "application/json";
                Response.Write(result);
                Response.End();
                
            }
        }
    
    }
    private string GetParams(Dictionary<string, string> dictParams)
    {
        if (dictParams.Count > 0)
        {
            return String.Join("&", dictParams.Select(obj => String.Format("{0}={1}", obj.Key, obj.Value)).ToArray());
        }
        return "";
    }

    private string CreateMD5(string input)
    {
        // Use input string to calculate MD5 hash
        MD5 md5 = System.Security.Cryptography.MD5.Create();
        byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
        byte[] hashBytes = md5.ComputeHash(inputBytes);

        // Convert the byte array to hexadecimal string
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hashBytes.Length; i++)
        {
            sb.Append(hashBytes[i].ToString("X2"));
        }
        return sb.ToString();
    }
    private string GetV_WC_E3G_CS_CAUSE_OF_DROP_DYCellListJsonText(int E3GCSDrop, int PE3GNeighborHODropDis)
    {

        string sql = @"
        SELECT *
        FROM V_WC_E3G_CS_CAUSE_OF_DROP_DY
        WHERE [E3GCSDrop] > @E3GCSDrop
        AND [PE3GNeighborHODropDis] > @PE3GNeighborHODropDis

";
        sql = sql.Replace("@E3GCSDrop", E3GCSDrop.ToString());
        sql = sql.Replace("@PE3GNeighborHODropDis", PE3GNeighborHODropDis.ToString());
        DBConnection conn = new DBConnection();

        //Get datatable from database.
        DataTable dt = conn.getDataTabale(sql, this.connectionString);
        string jsonText = JsonConvert.SerializeObject(dt, Formatting.Indented);

        return jsonText;
    }
    private string GetNeighborCellListJsonText(string[] arrCellId)
    {
        if (arrCellId.Where(str=>str.Trim().Length > 0).Count() > 0)
        {
            string sql = @"
select *
from v_wc_e3g_cs_cause_of_drop_dy 
where utrancell in (select UTRANRELATION from WC_E3G_HO_ADJ_NAME where UCELL_ID IN ('@cellIdList'))
";
            sql = sql.Replace("@cellIdList", String.Join("','", arrCellId.Where(str => str.Trim().Length > 0)));


            DBConnection conn = new DBConnection();

            //Get datatable from database.
            DataTable dt = conn.getDataTabale(sql, this.connectionString);
            string jsonText = JsonConvert.SerializeObject(dt, Formatting.Indented);

            return jsonText;
        }
        return "{}";
    }
    private string GetWC_E3G_HO_ADJ_NAMECellListJsonText(int E3GCSDrop, int PE3GNeighborHODropDis)
    {

        string sql = @"
select a.date_id,a.RNC,a.name_t,a.utrancell,b.UTRANRELATION as adj_cell,c.RNC as adj_RNC,c.name_t as adj_name_t,
c.pCell_avail,c.DownTime_Minute
from 
(select date_id,RNC,name_t,utrancell 
from v_wc_e3g_cs_cause_of_drop_dy where E3GCSDrop > @E3GCSDrop and PE3GNeighborHODropDis > @PE3GNeighborHODropDis
) a join WC_E3G_HO_ADJ_NAME b 
on (a.utrancell = UCELL_ID)
join v_wc_e3g_cs_cause_of_drop_dy c
on (b.UTRANRELATION = c.utrancell)

";
        sql = sql.Replace("@E3GCSDrop", E3GCSDrop.ToString());
        sql = sql.Replace("@PE3GNeighborHODropDis", PE3GNeighborHODropDis.ToString());
        DBConnection conn = new DBConnection();

        //Get datatable from database.
        DataTable dt = conn.getDataTabale(sql, this.connectionString);
        string jsonText = JsonConvert.SerializeObject(dt, Formatting.Indented);

        return jsonText;
    }
}