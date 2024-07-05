using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class Fare
    {
        [Key]
        public int FareID { get; set; }
        public int AirlineId { get; set; }
        public int CabinID { get; set; }
        public int RouteID { get; set; }
        public string fare { get; set; }
    }
}
