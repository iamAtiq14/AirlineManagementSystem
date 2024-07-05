using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class AirLineRoute
    {
        [Key]
        public int RouteID { get; set; }
        public int CountryFrom { get; set; }
        public int CountryTo { get; set; }
        public int CityFrom { get; set; }
        public int CityTo { get; set; }

        public int AirportFrom { get; set; }

        public int AirportTo { get; set; }
        public int Status { get; set; }
    }
}