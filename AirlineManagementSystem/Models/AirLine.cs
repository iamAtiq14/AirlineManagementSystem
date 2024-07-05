using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class AirLine
    {
        [Key]
        public int AirlineID { get; set; }
        public string Name { get; set; }
        public int BusinessCabin { get; set; }
        public int EconomyCabin { get; set; }
        public int TotalSeats { get; set; }
        public int Status { get; set; }
    }
}
