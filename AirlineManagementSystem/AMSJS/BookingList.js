
var iscountryfromValid = false;
var iscountrytoValid = false;
var iscityfromValid = false;
var iscitytoValid = false;
var isairportfromValid = false;
var isairporttoValid = false;

function validdateDropDowns(txt, msg, data) {
    
    if ($(txt + ' option:selected').val() == "-1") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').css("Enabled", "false");
        return false;
    }
    else {
        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').css("Enabled", "true");
        if (txt == "#ddlcountry") {
            var countryFromId = $(txt + ' option:selected').val();
            LoadCityfrom(countryFromId);
        }
        else if (txt == "#ddlcountryto") {
            var countrytoId = $(txt + ' option:selected').val();
            LoadCityto(countrytoId);
        }
        //else if (txt == "#ddlcf") {
        //    var CityId = $(txt + ' option:selected').val();
        //    LoadAirportfrom(CityId);
        //}
        return true;
    }
}

function validdateDropDowns1(txt, msg, data) {
    
    if ($(txt + ' option:selected').val() == "-1") {
        var mymsg = data + ' is required';
        $(txt).css("border-color", "red");
        $(msg).html(mymsg);
        $('#btnSubmit').css("Enabled", "false");
        return false;
    }
    else {
        $(txt).css("border-color", "green");
        $(msg).html("");
        $('#btnSubmit').css("Enabled", "true");
        if (txt == "#ddlcf") {
            var CityId = $(txt + ' option:selected').val();
            LoadAirportfrom(CityId);
        }
        else if (txt == "#ddlct") {
            var CitytoId = $(txt + ' option:selected').val();
            LoadAirportto(CitytoId);
        }
        return true;
    }
}

function validData() {
    iscountryfromValid = validdateDropDowns('#ddlcountry', '#msgcouf', 'Country From');
    iscountrytoValid = validdateDropDowns('#ddlToData', '#msgcouf', 'To data');
    iscityfromValid = validdateDropDowns1('#ddlcf', '#msgcf', 'City From');
    iscitytoValid = validdateDropDowns1('#ddlct', '#msgct', 'City To');
    isairportfromValid = validdateDropDowns('#ddlaf', '#msgaf', 'Airport From');
    isairporttoValid = validdateDropDowns('#ddlato', '#msgat', 'Airport To');
}

var BaseUrl = "https://localhost:44371/Customer/";

$(document).ready(function () {
    
    LoadFromData();
    //LoadCountry();
    //LoadCountryto();
    //LoadCityfrom();
    // LoadCityto();
    // LoadAirportfrom();
    //LoadAirportto();
    //LoadData();
});

function LoadCountry() {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            

            var html = '';
            html += '<select id="CountryFrom" class="form-control">';
            html += '<option value="-1">-Country From-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CountryId + '">' + data[i].CountryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcouf"></span>';
            $('#ddlcountry').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCountryto() {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            

            var html = '';
            html += '<select id="CountryTo" class="form-control">';
            html += '<option value="-1">-Country To-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CountryId + '">' + data[i].CountryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgctt"></span>';
            $('#ddlcountryto').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCityfrom(id) {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,
        dataType: 'JSON',
        success: function (data) {

            
            var html = '';
            html += '<select id="CityFrom" class="form-control">';
            html += '<option value="-1">-Select City From-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyCity.CityId + '">' + data[i].MyCity.CityName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcf"></span>';
            $('#ddlcf').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadCityto(id) {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            

            var html = '';
            html += '<select id="CityTo" class="form-control">';
            html += '<option value="-1">-Select City To-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyCity.CityId + '">' + data[i].MyCity.CityName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgct"></span>';
            $('#ddlct').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadAirportfrom(id) {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            

            var html = '';
            html += '<select id="AirportFrom" class="form-control">';
            html += '<option value="-1">-Airport From-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyAirPort.AirportID + '">' + data[i].MyAirPort.AirportName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgaf"></span>';
            $('#ddlaf').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadAirportto(id) {
    
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            

            var html = '';
            html += '<select id="AirportTo" class="form-control">';
            html += '<option value="-1">-Airport To-</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyAirPort.AirportID + '">' + data[i].MyAirPort.AirportName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgat"></span>';
            $('#ddlato').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadFromData() {

        $.ajax({
            type: 'GET',
            url: "https://localhost:44371/Customer/GetFromData",

            dataType: 'JSON',
            success: function (data) {
                var html = '';
                html += '<select id="ddlFrom" class="form-control">';
                html += '<option value="-1">-- select --</option>';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].MyCountry.CountryId + '">' + data[i].MyCity.CityName + '(' + data[i].MyAirPort.AirportName + ')</option>';
                }
                /*  */
                html += '</select>';
                html += '<span class="text-danger" id="msgfrom"></span>';
                $('#ddlFromData').html(html);
            },
            error: function (data) {
                alert(data.statusText);
            }
        });
}

function LoadToData() {
    debugger;
    var airportId = $("#ddlFrom option:selected").val();
        $.ajax({
            type: 'GET',
            url: "https://localhost:44371/Customer/GetToData?airportId=" + airportId,

            dataType: 'JSON',
            success: function (data) {
                var html = '';
                html += '<select id="ddlTo" class="form-control">';
                html += '<option value="-1">-- select --</option>';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].MyRoute.RouteID + '">' + data[i].MyCity.CityName + '(' + data[i].MyAirPort.AirportName + ')</option>';
                }
                /*  */
                html += '</select>';
                html += '<span class="text-danger" id="msgcouf"></span>';
                $('#ddlToData').html(html);
            },
            error: function (data) {
                alert(data.statusText);
            }
        });
}

function LoadData() {
    
    $.ajax({
        type: 'GET',
        url: BaseUrl + 'GetData/',
        dataType: 'JSON',
        success: function (data) {
            
            //CreateTableRow(data);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function SelectionValid() {

    var formdata = new FormData();
    
    $.ajax({
        type: 'POST',
        url: "https://localhost:44371/Customer/BookingList",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            
            if (data.msg == true) {
                iziToast.error({
                    title: 'Sorry Currently Unavilable Please check more',
                    position: 'center',
                    timeout: 4000
                });
            }
        },
        error: function (data) {
            
            iziToast.error({
                title: 'Error',
                position: 'center',
                message: 'Illegal operation',
            });
        }
    });
}

function Searchflights() {
    
    var routeId = $("#ddlTo option:selected").val();
    $.ajax({
        url: BaseUrl + 'Searchflights?routeId=' + routeId,
        type: 'POST',
        success: function (data) {
            
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<div class="booking-list-item">';
                html += '<div class="booking-list-item-inner" >';
                html += '        <div class="booking-list-top">';
                html += '               <div class="flight-airway">';
                html += '                         <div class="flight-logo">';
                html += '                             <img src="~/CustomerAssets/img/icon/booking_icon02.jpg" alt="">';
                html += '                             <ul class="flight-info">';
                html += '                                 <li>';
                html += '                                     Airline : <h5 class="title">' + data[i].MyAirLine.Name + '</h5>';
                html += '                                 </li>';
                html += '                                 <li>Route : <h5>' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ') To ' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ')</h5></li>';
                html += '                                 <li>';
                html += '                                     Flight Status :';
                if (data[i].MySchedule.Status == 0) {
                    html += '                                         <h5 class="text-danger">InActive</h5>';
                }
                else {
                    html += '                                         <h5 class="text-success">Active</h5>';
                }
                html += '                                 </li>';
                html += '                             </ul>';
                html += '                         </div>';
                html += '                     </div>';
                html += '                 </div>';
                html += '                 <div class="booking-list-bottom">';
                html += '                     <ul>';
                html += '                         <li class="detail"><i class="fa-solid fa-angle-down"></i> Flight Detail</li>';
                html += '                         <li>Price per person (incl. taxes & fees)</li>';
                html += '                     </ul>';
                html += '                 </div>';
                html += '             </div>';
                html += ' <div class="flight-detail-wrap">';
                html += '     <div class="flight-date">';
                html += '         <ul>';
                html += '             <li>Date Schedule</li>';
                html += '             <li>Departure Date</li>';

                //var DepartureDate = data[i].MySchedule.DepartureDate;
                //var DepartureDate_new = new Date(DepartureDate);
                debugger;
                //var arr = data[i].MySchedule.DepartureDate.slice(6, 19);
                //var d = '{ "mydate":' + arr + ' }';
                //var obj = JSON.parse(d);
                //const dates = new Date(obj.mydate).toDateString(); 
                
                var obj1 = '{ "mydate":' + data[i].MySchedule.DepartureDate.slice(6, 19) + ' }';
                var depDate = new Date(JSON.parse(obj1).mydate).toDateString(); 

                html += '             <li><span>' + depDate + '</span></li>';
                html += '             <li>Departure Time</li>';
                var obj2= '{ "myDeptime":' + data[i].MySchedule.DepartureTime.slice(6, 19) + ' }';
                var deptime = new Date(JSON.parse(obj2).myDeptime).toLocaleTimeString(); 
                html += '             <li><span>' + deptime + '</span></li>';
                //html += '             <li><span>' + data[i].MySchedule.DepartureTime + '</span></li>';
                html += '             <li>Arrival Time</li>';
                var obj3 = '{ "myArrtime":' + data[i].MySchedule.ArrivalTime.slice(6, 19) + ' }';
                var arrtime = new Date(JSON.parse(obj3).myArrtime).toLocaleTimeString();
                html += '             <li><span>' + arrtime + '</span></li>';
                //html += '             <li><span>' + data[i].MySchedule.ArrivalTime + '</span></li>';
                html += '         </ul>';
                html += '     </div>';
                html += '     <div class="flight-detail-right">';
                html += '         <span>Airport</span>';
                html += '         <h4 class="title">' + data[i].Airportfrom.AirportName + ' To ' + data[i].Airportto.AirportName + '</h4>';
                html += '         <div class="flight-detail-info">';
                html += '             <ul>';
                html += '                 <li>Bussiness Cabin :<h5>' + data[i].MyAirLine.BusinessCabin + '</h5></li>';
                html += '                 <li>Economy Cabin :<h5>' + data[i].MyAirLine.EconomyCabin + '</h5></li>';
                html += '                 <li>Total Cabin :<h5>' + data[i].MyAirLine.TotalSeats + '</h5></li>';
                html += '                 <li>Operated by Airlines</li>';
                html += '                 <li>Economy | Flight EK585 | Aircraft BOEING 777-300ER</li>';
                html += '                 <li>Adult(s): 25KG luggage free</li>';
                html += '             </ul>';
                html += '         </div>';
                html += '         <h4 class="title title-two">DXB - Dubai, United Arab Emirates</h4>';
                html += '     </div>';
                html += '     <hr />';
                html += '     <div class="col-md-12 text-center">';
                if (data[i].MySchedule.Status == 0) {
                    html += '<a class="col-md-12 btn" onclick="SelectionValid();">Sorry <i class="flaticon-flight-1"></i></a>';
                }
                else {
                    html += '<a href="../Reservation/BookingDetail?scheduleId=' + data[i].MySchedule.FlightScheduleID + '" class="col-md-12 btn">Select <i class="flaticon-flight-1"></i></a>';
                }
                html += '   </div>';
                html += '</div >';
                html += '</div > ';
            }
            $('#mydataa').html(html);
        },
        error: function (data) {
            iziToast.error({
                title: 'Error',
                position: 'center',
                timeout: 5000,
                message: 'Please select Your Data',
            });
        }
    });
}
