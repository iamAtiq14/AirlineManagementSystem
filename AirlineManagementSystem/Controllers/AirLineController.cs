using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class AirLineController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddAirLine()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddAirLine(AirLine ar)
        {
            AirLine a = db.AirLines.Where(x => x.Name == ar.Name).FirstOrDefault();
            if (a!=null && a.AirlineID != ar.AirlineID)
            {
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                if (ar.AirlineID > 0)
                {
                    ar.TotalSeats = ar.EconomyCabin + ar.BusinessCabin;
                    db.Entry(ar).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    ar.TotalSeats = ar.EconomyCabin + ar.BusinessCabin;
                    db.AirLines.Add(ar);
                }
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult EditById(int AId)
        {
            AirLine ar = new AirLine();
            if (AId > 0) 
            {
                ar = db.AirLines.Where(x=>x.AirlineID==AId).FirstOrDefault();
            }
            return Json(ar,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.AirLines.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}