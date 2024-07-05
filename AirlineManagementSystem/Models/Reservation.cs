using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationID { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string CNIC { get; set; }
        public string Email { get; set; }

        public string Phoneno { get; set; }
        public string PassportNo { get; set; }
        public string Nationality { get; set; }
        public int CabinID { get; set; }
        public int FlightScheduleId { get; set; }
        public string ReservationCode { get; set; }

        public string SeatNo { get; set; }
        public string Password { get; set; }

        public int Status { get; set; }
    }
}

