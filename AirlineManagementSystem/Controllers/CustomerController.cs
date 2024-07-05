using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AirlineManagementSystem.Controllers
{
    public class CustomerController : Controller //Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult Customer()
        {
            ViewBag.Schedule = Schedulelist();
            return View();
        }
        
        [HttpGet]
        public ActionResult GetFromData()
        {
            var data = (from a in db.Airports join
                        ci in db.Cities on a.CityID equals ci.CityId join
                        cn in db.Countries on ci.CountryId equals cn.CountryId
                        select new MyModel()
                        {
                            MyAirPort = a,
                            MyCity = ci,
                            MyCountry = cn
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet]
        public ActionResult GetToData(int airportId)
        {
            var data = (from r in db.AirLineRoutes join
                        ci in db.Cities on r.CityTo equals ci.CityId join
                        a in db.Airports on r.AirportTo equals a.AirportID
                        select new MyModel()
                        {
                            MyRoute= r,
                            MyCity= ci,
                            MyAirPort= a,
                        }).Where(x=>x.MyRoute.AirportFrom == airportId).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.AirLineRoutes
                        join C in db.Countries on R.CountryFrom equals C.CountryId
                        join Co in db.Countries on R.CountryTo equals Co.CountryId
                        join Ci in db.Cities on R.CityFrom equals Ci.CityId
                        join Cit in db.Cities on R.CityTo equals Cit.CityId
                        join A in db.Airports on R.AirportFrom equals A.AirportID
                        join Ai in db.Airports on R.AirportTo equals Ai.AirportID
                        select new MyModel()
                        {
                            Countryfrom = C,
                            Countryto = Co,
                            Cityfrom = Ci,
                            Cityto = Cit,
                            Airportfrom = A,
                            Airportto = Ai,
                            MyRoute = R
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Searchflights(int routeId)
        {
            //string query = @"select DepartureTime,ArrivalTime,Date,a.AirlineName 
            //from tbl_schedule s inner join tbl_airline a on s.airlineid=a.airlineid 
            //where routeid=" + routeid + " and Date  " +
            //"between '" + Convert.ToDateTime(currentdate).ToString("MM-dd-yyyy") + "' " +
            //"and '" + Convert.ToDateTime(currentdate).AddDays(6).ToString("MM-dd-yyyy") + "' " +
            //"and DepartureTime>'" + currentdate.AddHours(3).ToString("MM-dd-yyyy hh:mm tt") + "' " +
            //"order by Date";
            var data = (from s in db.Schedules
                        join a in db.AirLines on s.AirLineId equals a.AirlineID

                        join r in db.AirLineRoutes on s.RouteId equals r.RouteID
                        join cf in db.Countries on r.CountryFrom equals cf.CountryId
                        join ct in db.Countries on r.CountryTo equals ct.CountryId
                        join cif in db.Cities on r.CityFrom equals cif.CityId
                        join cit in db.Cities on r.CityTo equals cit.CityId
                        join aif in db.Airports on r.AirportFrom equals aif.AirportID
                        join ait in db.Airports on r.AirportTo equals ait.AirportID
                        select new MyModel()
                        {
                            MySchedule = s,
                            MyAirLine = a,

                            Countryfrom = cf,
                            Countryto= ct,
                            Cityfrom=cif,
                            Cityto=cit,
                            Airportfrom=aif,
                            Airportto=ait,
                        }).Where(x=>x.MySchedule.RouteId == routeId).ToList();
            ViewBag.Schedule = data;
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public dynamic Schedulelist()
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
            return data;
        }

        [HttpGet]
        public ActionResult BookingList()
        {
            ViewBag.Schedule = Schedulelist();
            return View();
        }

        [HttpPost]
        public ActionResult BookingList(Schedule sc)
        {
            if (sc.Status == 0)
            {
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                ViewBag.Schedule = Schedulelist();
            }
            return View();
        }

        [HttpGet]
        public ActionResult About()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Contact()
        {
            return View();
        }

        [HttpGet]
        public ActionResult FlightStatus()
        {
            ViewBag.Schedule = Schedulelist();
            return View();
        }
        [HttpGet]
        public ActionResult Kiramat()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Mohsin()
        {
            return View();
        }
        [HttpGet]
        public ActionResult seikh()
        {
            return View();
        }
        [HttpGet]
        public ActionResult SirWaqas()
        {
            return View();
        }
        [HttpGet]
        public ActionResult SirMujeeb()
        {
            return View();
        }
        [HttpGet]
        public ActionResult MamAmina()
        {
            return View();
        }
        [HttpGet]
        public ActionResult MamUmaima()
        {
            return View();
        }
    }
}