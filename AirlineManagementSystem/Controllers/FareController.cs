using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class FareController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddFare()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddFare(Fare fa)
        {
            if (fa.FareID > 0) 
            {
                db.Entry(fa).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Fares.Add(fa);
            }
            db.SaveChanges();
            return Json("",JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int FID)
        {
            Fare f = new Fare();
            if (FID > 0) 
            {
                f = db.Fares.Where(x => x.FareID == FID).FirstOrDefault();
            }
            return Json(f, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from F in db.Fares
                        join R in db.AirLineRoutes on F.RouteID equals R.RouteID
                        join cf in db.Countries on R.CountryFrom equals cf.CountryId
                        join ct in db.Countries on R.CountryTo equals ct.CountryId
                        join cif in db.Cities on R.CityFrom equals cif.CityId
                        join cit in db.Cities on R.CityTo equals cit.CityId
                        join A in db.AirLines on F.AirlineId equals A.AirlineID
                        join C in db.Cabins on F.CabinID equals C.CabinId
                        select new MyModel
                        {
                            MyFare = F,
                            MyAirLine = A,
                            MyCabin = C,
                            MyRoute = R,
                            Countryfrom = cf,
                            Countryto = ct,
                            Cityfrom = cif,
                            Cityto = cit
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

       
        //[HttpGet]
        //public ActionResult GetDataByCabin(int Id)
        //{
        //    var data = (from F in db.Fares
        //                select new MyModel
        //                {
        //                    MyFare = F
        //                }).Where(x => x.MyFare.CabinID == Id).ToList();
        //    return Json(data, JsonRequestBehavior.AllowGet);
        //}
    }
}