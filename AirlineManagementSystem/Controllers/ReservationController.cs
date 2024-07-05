using AirlineManagementSystem.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AirlineManagementSystem.Controllers
{
    public class ReservationController : Controller
    {
        AppDbContext db = new AppDbContext();
        public static List<Reservation> adultList = new List<Reservation>();
        public static List<Fare> fareList = new List<Fare>();
        public static string ReservationCode = string.Empty;
        
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(string reservationCode)
        {
            var data = (from Re in db.Reservations
                        join C in db.Cabins on Re.CabinID equals C.CabinId
                        join S in db.Schedules on Re.FlightScheduleId equals S.FlightScheduleID
                        join R in db.AirLineRoutes on S.RouteId equals R.RouteID
                        join c in db.Countries on R.CountryFrom equals c.CountryId
                        join co in db.Countries on R.CountryTo equals co.CountryId
                        join ci in db.Cities on R.CityFrom equals ci.CityId
                        join cit in db.Cities on R.CityTo equals cit.CityId
                        join A in db.AirLines on S.AirLineId equals A.AirlineID
                        select new MyModel
                        {
                            Countryfrom = c,
                            Cityfrom = ci,
                            Countryto = co,
                            Cityto = cit,
                            MyAirLine =A,
                            MyRoute=R,
                            MySchedule = S,
                            MyCabin = C,
                            MyReservation = Re
                        }
                      ).Where(x=>x.MyReservation.ReservationCode == reservationCode).ToList(); 
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult BookingDetail(int scheduleId)
        {
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
                            Countryto = ct,
                            Cityfrom = cif,
                            Cityto = cit,
                            Airportfrom = aif,
                            Airportto = ait,
                        }).Where(x => x.MySchedule.FlightScheduleID == scheduleId).FirstOrDefault();
            ViewBag.ScheduleData = data;
            ViewBag.ScheduleId = scheduleId;
            ViewBag.fare = farelist();
            return View(data);
        }
        [HttpPost]
        public ActionResult BookingDetail()
        {
            foreach (var r in adultList)
            {
                var seatno = db.Reservations.Where(x=>x.FlightScheduleId == r.FlightScheduleId).Count();
                //if (seatno == 0)
                //    //seatno = db.Reservations.Max(x => x.ReservationID);
                //    seatno = 0;
                r.SeatNo = Convert.ToString(seatno + 1);
                db.Reservations.Add(r);
                db.SaveChanges();
            }
            adultList.Clear();
            fareList.Clear();
            string resCode = ReservationCode;
            ReservationCode = string.Empty;
            //ViewBag.fare = farelist();
            return Json(new { resCode }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AddAdult(Reservation r)
        {
            if (string.IsNullOrEmpty(ReservationCode))
            {
                ReservationCode = Guid.NewGuid().ToString();
                r.ReservationCode = ReservationCode;
            }
            else
                r.ReservationCode = ReservationCode;
            r.SeatNo = "0";
            r.Password = "NULL";
            r.Status = 0;
            adultList.Add(r);
            Fare fare = db.Fares.Where(x=>x.CabinID == r.CabinID).FirstOrDefault();
            fareList.Add(fare);
            int adultCount = 0;
            int totalFare = 0;
            for (var i = 0; i < fareList.Count; i++)
            {
                adultCount++;
                totalFare += Convert.ToInt32(fareList[i].fare);
            }
            return Json(new { fareList, adultCount, totalFare }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int Id)
        {
            Reservation r = new Reservation();
            if (Id > 0)
            {
                r = db.Reservations.Where(x => x.ReservationID == Id).FirstOrDefault();
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.Reservations
                        join C in db.Cabins on R.CabinID equals C.CabinId
                        join S in db.Schedules on R.FlightScheduleId equals S.FlightScheduleID
                        select new MyModel
                        {
                            MySchedule = S,
                            MyCabin = C,
                            MyReservation = R
                        }
                      ).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult LoadFare(int cabinId, int routeId)
        {
            var data = db.Fares.Where(x=>x.RouteID== routeId && x.CabinID == cabinId).FirstOrDefault();
           // ViewBag.adults = adults;
            return Json(data,JsonRequestBehavior.AllowGet);
        }

        public dynamic farelist()
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
            return data;
        }
    }
}