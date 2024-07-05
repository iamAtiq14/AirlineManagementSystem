using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class AirPortController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        void joindata()
        {
            var C = db.Cities.ToList();
            C.Insert(0, new City { CityId = -1, CityName = "---Select City---" });
            ViewBag.City = C;
        }
        [HttpGet]
        public ActionResult AddAirport()
        {
            joindata();
            return View();
        }

        [HttpPost]
        public ActionResult AddAirport(AirPort ar)
        {
            joindata();
            if (ar.AirportID > 0) 
            {
                db.Entry(ar).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Airports.Add(ar);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int AID)
        {
            joindata();
            AirPort ar = new AirPort();
            if (AID > 0) 
            {
                ar = db.Airports.Where(x => x.AirportID == AID).FirstOrDefault();
            }
            return Json(ar, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            joindata();
            var data = (from A in db.Airports
                        join C in db.Cities on A.CityID equals C.CityId
                        select new MyModel
                        {
                            MyCity = C,
                            MyAirPort = A
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAirportById(int Id)
        {
            var data = (from A in db.Airports
                        select new MyModel
                        {
                            MyAirPort = A
                        }).Where(x => x.MyAirPort.CityID == Id).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}