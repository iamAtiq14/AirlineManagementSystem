using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class CityController : AdminBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddCity()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddCity(City c)
        {
            if (c.CityId > 0) 
            {
                db.Entry(c).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Cities.Add(c);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int CID)
        {
            City c = new City();
            if (CID > 0) 
            {
                c = db.Cities.Where(x => x.CityId == CID).FirstOrDefault();
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from C in db.Cities
                        join P in db.Provinces on C.ProvinceId equals P.ProvinceId
                        join CO in db.Countries on C.CountryId equals CO.CountryId
                        select new MyModel
                        {
                            MyCountry = CO,
                            MyProvince = P,
                            MyCity = C
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetDataByCountryId(int Id)
        {
            var data = (from C in db.Cities
                        select new MyModel
                        {
                            MyCity = C
                        }).Where(x=>x.MyCity.CountryId == Id).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}