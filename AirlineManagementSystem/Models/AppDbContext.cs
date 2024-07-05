using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext()
            :base("name=AppDbContext")
            {
            }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<AirLine> AirLines { get; set; }
        public DbSet<AirLineRoute> AirLineRoutes { get; set; }
        public DbSet<AirPort> Airports { get; set; }
        public DbSet<Cabin> Cabins { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Fare> Fares { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
    }
}