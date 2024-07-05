using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class AirPort
    {
        [Key]
        public int AirportID { get; set; }
        public string AirportName { get; set; }
        public int CityID { get; set; }
        public int Status { get; set; }
    }
}
