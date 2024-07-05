using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class CountryController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddCountry()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddCountry(Country c)
        {
            if (c.CountryId > 0) 
            {
                db.Entry(c).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Countries.Add(c);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int CID)
        {
            Country c = new Country();
            if (CID > 0) 
            {
                c = db.Countries.Where(x => x.CountryId == CID).FirstOrDefault();
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Countries.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}