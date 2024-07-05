namespace AirlineManagementSystem.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DbAMS : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
                c => new
                    {
                        AdminId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Contact = c.String(),
                        Address = c.String(),
                        Image = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.AdminId);
            
            CreateTable(
                "dbo.AirLineRoutes",
                c => new
                    {
                        RouteID = c.Int(nullable: false, identity: true),
                        CountryFrom = c.Int(nullable: false),
                        CountryTo = c.Int(nullable: false),
                        CityFrom = c.Int(nullable: false),
                        CityTo = c.Int(nullable: false),
                        AirportFrom = c.Int(nullable: false),
                        AirportTo = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RouteID);
            
            CreateTable(
                "dbo.AirLines",
                c => new
                    {
                        AirlineID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        BusinessCabin = c.Int(nullable: false),
                        EconomyCabin = c.Int(nullable: false),
                        TotalSeats = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AirlineID);
            
            CreateTable(
                "dbo.AirPorts",
                c => new
                    {
                        AirportID = c.Int(nullable: false, identity: true),
                        AirportName = c.String(),
                        CityID = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AirportID);
            
            CreateTable(
                "dbo.Cabins",
                c => new
                    {
                        CabinId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CabinId);
            
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        CityId = c.Int(nullable: false, identity: true),
                        CityName = c.String(),
                        CountryId = c.Int(nullable: false),
                        ProvinceId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CityId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        CountryId = c.Int(nullable: false, identity: true),
                        CountryName = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CountryId);
            
            CreateTable(
                "dbo.Fares",
                c => new
                    {
                        FareID = c.Int(nullable: false, identity: true),
                        AirlineId = c.Int(nullable: false),
                        CabinID = c.Int(nullable: false),
                        RouteID = c.Int(nullable: false),
                        fare = c.String(),
                    })
                .PrimaryKey(t => t.FareID);
            
            CreateTable(
                "dbo.Provinces",
                c => new
                    {
                        ProvinceId = c.Int(nullable: false, identity: true),
                        ProvinceName = c.String(),
                        CountryId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProvinceId);
            
            CreateTable(
                "dbo.Reservations",
                c => new
                    {
                        ReservationID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        CNIC = c.String(),
                        Email = c.String(),
                        Phoneno = c.String(),
                        PassportNo = c.String(),
                        Nationality = c.String(),
                        CabinID = c.Int(nullable: false),
                        FlightScheduleId = c.Int(nullable: false),
                        ReservationCode = c.String(),
                        SeatNo = c.String(),
                        Password = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ReservationID);
            
            CreateTable(
                "dbo.Schedules",
                c => new
                    {
                        FlightScheduleID = c.Int(nullable: false, identity: true),
                        AirLineId = c.Int(nullable: false),
                        RouteId = c.Int(nullable: false),
                        DepartureDate = c.DateTime(nullable: false),
                        DepartureTime = c.DateTime(nullable: false),
                        ArrivalTime = c.DateTime(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.FlightScheduleID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Schedules");
            DropTable("dbo.Reservations");
            DropTable("dbo.Provinces");
            DropTable("dbo.Fares");
            DropTable("dbo.Countries");
            DropTable("dbo.Cities");
            DropTable("dbo.Cabins");
            DropTable("dbo.AirPorts");
            DropTable("dbo.AirLines");
            DropTable("dbo.AirLineRoutes");
            DropTable("dbo.Admins");
        }
    }
}
