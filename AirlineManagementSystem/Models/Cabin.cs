using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class Cabin
    {
        [Key]
        public int CabinId { get; set; }
        public string Name { get; set; }

        public int Status { get; set; }
    }
}
