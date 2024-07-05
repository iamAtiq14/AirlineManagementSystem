using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class AccountController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignUp(Admin adm,HttpPostedFileBase MyImage)
        {
                if (MyImage != null || adm.Image == null)
                {
                    string imgname = Guid.NewGuid() + MyImage.FileName;
                    MyImage.SaveAs(Server.MapPath("~/UploadImage/") + imgname);
                    adm.Image = imgname;
                }
                db.Admins.Add(adm);
                db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult LogIn()
        {
            return View();
        }
        [HttpPost]
        public ActionResult LogIn(Admin adm)
        {
            adm = db.Admins.Where(x => x.Email == adm.Email && x.Password == adm.Password).FirstOrDefault();
            if (adm!=null)
            {
                Session["AdminId"] = adm.AdminId;
                Session["Name"] = adm.Name;
                Session["Email"] = adm.Email;
                Session["Image"] = adm.Image;
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
        }

      
    }
}