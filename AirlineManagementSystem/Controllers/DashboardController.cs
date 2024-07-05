using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class DashboardController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult Dashboard()
        {
            ViewBag.res = ReservationRequest();
            return View();
        }

        public dynamic ReservationRequest()
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
                            MyAirLine = A,
                            MyRoute = R,
                            MySchedule = S,
                            MyCabin = C,
                            MyReservation = Re
                        }).ToList();
            return data;
        }

        [HttpGet]
        public ActionResult ViewReservation(int appID)
        {
            ViewBag.res = ReservationRequest();
            MyModel data = (from Re in db.Reservations
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
                                MyAirLine = A,
                                MyRoute = R,
                                MySchedule = S,
                                MyCabin = C,
                                MyReservation = Re
                            }).Where(x => x.MyReservation.ReservationID == appID).FirstOrDefault();
            return View(data);
        }

        public ActionResult CheckStatus(int appid, int status)
        {
            Reservation a = db.Reservations.Find(appid);
            if (status == 0)
            {
                a.Status = 0;
            }
            else if (status == 1)
            {
                a.Status = 1;
            }
            else if (status == 2)
            {
                a.Status = 2;
            }
            else
            {
                a.Status = 3;
            }
            db.Entry(a).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Dashboard", new { appID = appid });
        }

        [HttpGet]
        public ActionResult ProfileView()
        {
            int Adminid = Convert.ToInt32(Session["AdminId"]);
            return View(db.Admins.Where(x => x.AdminId == Adminid).FirstOrDefault());
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("LogIn", "Account");
        }

        [HttpGet]
        public ActionResult DetailDashboard()
        {
            ViewBag.airline = db.AirLines.Count();
            ViewBag.airport = db.Airports.Count();
            ViewBag.cabin = db.Cabins.Count();
            ViewBag.city = db.Cities.Count();
            ViewBag.country = db.Countries.Count();
            ViewBag.province = db.Provinces.Count();
            ViewBag.reservation = db.Reservations.Count();
            ViewBag.route = db.AirLineRoutes.Count();
            ViewBag.schedule = db.Schedules.Count();

            ViewBag.airline1 = db.AirLines.ToList();
            ViewBag.airport1 = db.Airports.ToList();
            ViewBag.cabin1 = db.Cabins.ToList();
            ViewBag.city1 = db.Cities.ToList();
            ViewBag.country1 = db.Countries.ToList();
            ViewBag.province1 = db.Provinces.ToList();
            ViewBag.reservation1 = db.Reservations.ToList();
            ViewBag.route1 = db.AirLineRoutes.ToList();
            ViewBag.schedule1 = db.Schedules.ToList();
            return View();
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            Admin adm = db.Admins.Find(Convert.ToInt32(Session["AdminId"]));
            return View(adm);
        }
        [HttpPost]
        public ActionResult ProfileEdit(Admin adm, HttpPostedFileBase Image)
        {
            if (string.IsNullOrEmpty(adm.Image) || Image != null)
            {
                string imgName = Guid.NewGuid() + Image.FileName;
                Image.SaveAs(Server.MapPath("~/UploadImage/") + imgName);
                adm.Image = imgName;
            }
            Admin admin = db.Admins.Find(adm.AdminId);
            db.Entry(admin).CurrentValues.SetValues(adm); //Current value means picks old data// setvalues means update new value with old values;
            db.SaveChanges();
            Session["Name"] = adm.Name;
            Session["Image"] = adm.Image;
            return RedirectToAction("Dashboard", "Dashboard");
        }
    }
}