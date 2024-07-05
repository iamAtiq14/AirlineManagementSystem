using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class RouteController : AdminBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddRoute()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddRoute(AirLineRoute ar)
        {
            if (ar.CityFrom == ar.CityTo)
            {
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else if (ar.AirportFrom ==ar.AirportTo)
            {
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                if (ar.RouteID > 0)
                {
                    db.Entry(ar).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    db.AirLineRoutes.Add(ar);
                }
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int RID)
        {
            AirLineRoute ar = new AirLineRoute();
            if (RID > 0)
            {
                ar = db.AirLineRoutes.Where(x => x.RouteID == RID).FirstOrDefault();
            }
            return Json(ar, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.AirLineRoutes
                        join cf in db.Countries on R.CountryFrom equals cf.CountryId
                        join ct in db.Countries on R.CountryTo equals ct.CountryId
                        join c in db.Cities on R.CityFrom equals c.CityId
                        join CT in db.Cities on R.CityTo equals CT.CityId
                        join A in db.Airports on R.AirportFrom equals A.AirportID
                        join AT in db.Airports on R.AirportTo equals AT.AirportID
                        select new MyModel
                        {
                            Countryfrom = cf,
                            Countryto = ct,
                            Cityfrom = c,
                            Cityto = CT,
                            Airportfrom = A,
                            Airportto = AT,
                            MyRoute = R
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}