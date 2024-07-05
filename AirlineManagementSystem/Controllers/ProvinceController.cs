using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class ProvinceController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        void joindata()
        {
            var c = db.Countries.ToList();
            c.Insert(0, new Country { CountryId = -1, CountryName = "---select Country---" });
            ViewBag.country = c;
        }
        [HttpGet]
        public ActionResult AddProvince()
        {
            joindata();
            return View();
        }

        [HttpPost]
        public ActionResult AddProvince(Province p)
        {
            joindata();
            if (p.ProvinceId > 0)
            {
                db.Entry(p).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Provinces.Add(p);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int PID)
        {
            joindata();
            Province p = new Province();
            if (PID > 0)
            {
                p = db.Provinces.Where(x => x.ProvinceId == PID).FirstOrDefault();
            }
            return Json(p, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            joindata();
            var data = (from P in db.Provinces
                        join C in db.Countries on P.CountryId equals C.CountryId
                        select new MyModel
                        {
                            MyCountry = C,
                            MyProvince = P
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetDataByCountryId(int Id)
        {
            var data = (from P in db.Provinces
                        select new MyModel
                        {
                            MyProvince = P
                        }).Where(x => x.MyProvince.CountryId == Id).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}