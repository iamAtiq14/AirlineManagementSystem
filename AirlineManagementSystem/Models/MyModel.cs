using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class MyModel
    {
        public Province MyProvince { get; set; }
        public Country  MyCountry { get; set; }
        public Country  Countryfrom { get; set; }
        public Country  Countryto { get; set; }
        public City  MyCity { get; set; }
        public City  Cityfrom { get; set; }
        public City  Cityto { get; set; }
        public AirPort  MyAirPort { get; set; }
        public AirPort  Airportfrom { get; set; }
        public AirPort  Airportto { get; set; }
        public AirLineRoute  MyRoute { get; set; }
        public Fare  MyFare { get; set; }
        public AirLine  MyAirLine { get; set; }
        public Cabin  MyCabin { get; set; }
        public Schedule  MySchedule { get; set; }
        public Reservation  MyReservation { get; set; }
    }
}