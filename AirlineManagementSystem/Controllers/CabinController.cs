using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class CabinController : AdminBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddCabin()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddCabin(Cabin ca)
        {
            if (ca.CabinId > 0) 
            {
                db.Entry(ca).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Cabins.Add(ca);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int CID)
        {
            Cabin c = new Cabin();
            if (CID > 0) 
            {
                c = db.Cabins.Where(x => x.CabinId == CID).FirstOrDefault();
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Cabins.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}