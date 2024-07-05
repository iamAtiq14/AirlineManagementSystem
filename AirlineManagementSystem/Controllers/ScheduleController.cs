using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class ScheduleController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddSchedule()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddSchedule(Schedule Sc)
        {
            if (Sc.FlightScheduleID > 0)
            {
                db.Entry(Sc).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Schedules.Add(Sc);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int SID)
        {
            Schedule s = new Schedule();
            if (SID > 0)
            {
                s = db.Schedules.Where(x => x.FlightScheduleID == SID).FirstOrDefault();
            }
            return Json(s, JsonRequestBehavior.AllowGet);
        }


        //public dynamic Schedulelist()
        //{
        //    var data = (from S in db.Schedules
        //                join R in db.AirLineRoutes on S.RouteId equals R.RouteID
        //                join c in db.Countries on R.CountryFrom equals c.CountryId
        //                join co in db.Countries on R.CountryTo equals co.CountryId
        //                join ci in db.Cities on R.CityFrom equals ci.CityId
        //                join cit in db.Cities on R.CityTo equals cit.CityId
        //                join A in db.AirLines on S.AirLineId equals A.AirlineID
        //                join ap in db.Airports on R.AirportFrom equals ap.AirportID
        //                join apt in db.Airports on R.AirportTo equals apt.AirportID
        //                select new MyModel()
        //                {
        //                    Airportfrom = ap,
        //                    Airportto = apt,
        //                    MyRoute = R,
        //                    Countryfrom = c,
        //                    Cityfrom = ci,
        //                    Countryto = co,
        //                    Cityto = cit,
        //                    MySchedule = S,
        //                    MyAirLine = A
        //                }).ToList();
        //    return data;
        //}

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from S in db.Schedules
                        join R in db.AirLineRoutes on S.RouteId equals R.RouteID
                        join c in db.Countries on R.CountryFrom equals c.CountryId
                        join co in db.Countries on R.CountryTo equals co.CountryId
                        join ci in db.Cities on R.CityFrom equals ci.CityId
                        join cit in db.Cities on R.CityTo equals cit.CityId
                        join A in db.AirLines on S.AirLineId equals A.AirlineID
                        join ap in db.Airports on R.AirportFrom equals ap.AirportID
                        join apt in db.Airports on R.AirportTo equals apt.AirportID
                        select new MyModel()
                        {
                            Airportfrom = ap,
                            Airportto = apt,
                            MyRoute = R,
                            Countryfrom = c,
                            Cityfrom = ci,
                            Countryto = co,
                            Cityto = cit,
                            MySchedule = S,
                            MyAirLine = A
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
            //ViewBag.Schedule = Schedulelist();
            //List<Schedule> list = db.Schedules.ToList();
            //return PartialView("_Schedule", list);
        }

       

        //[HttpPost]
        //public ActionResult Searchflights(AirLineRoute model)
        //{
        //    var data = (from S in db.Schedules
        //                select new MyModel
        //                {
        //                    MySchedule = S
        //                }).Where(x => x.MySchedule.RouteId == Id).ToList();
        //    ViewBag.Schedule = data;
        //    return Json(data, JsonRequestBehavior.AllowGet);
        //}
    }
}