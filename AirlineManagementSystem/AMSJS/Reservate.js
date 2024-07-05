var fname = false;
var lname = false;
var cnic = false;
var email = false;
var phone = false;
var passport = false;
var nationality = false;
var cabin = false;
var fschedule = false;
var rescode = false;
var seat = false;
var pasword = false;
var status = false;

function validdateDropDowns(txt, msg, data) {
    debugger;
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
        return true;
    }
}

function validdate(txt, msg, data) {
    debugger;
    if ($(txt).val() == "") {
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
        checkname("#msgName");
        checklname("#msgLName");
        checkemail("#msgemail");
        return true;
    }
}

function validData() {
    fname = validdate('#firstName', '#msgName', 'First Name ');
    lname = validdate('#lastName', '#msgLName', 'Last Name ');
    cnic = validdate('#cNIC', '#msgcnic', 'CNIC');
    email = validdate('#email', '#msgemail', 'Email ');
    phone = validdate('#phoneno', '#phone', 'Phone No');
    passport = validdate('#passportNo', '#msgpassport', 'Passport No');
   // nationality = validdate('#nationality', '#msgnationality', 'Nationality');
    nationality = validdateDropDowns('#nationality', '#msgnationality', 'Nationality');
    cabin = validdateDropDowns('#cabinID', '#msgcabin', 'Cabin');
    //fschedule = validdateDropDowns('#flightScheduleId', '#msgfschedule', 'Flight Schedule');
    //rescode = validdate('#reservationCode', '#msgrescode', 'Reservation Code');
    //seat = validdate('#seatNo', '#msgseat', 'Seat');
    //pasword = validdate('#password', '#msgpassword', 'Password');
    //status = validdateDropDowns('#status', '#msgstatus', 'Status');
}

function checkname(msg) {
    var pattern = /^[a-z A-Z]*$/;
    var name = $("#firstName").val();
    if (pattern.test(name)) {
        $(msg).html("");
        return true;
    }
    else {
        $(msg).html("Should contain only Characters");
        $(msg).show();
        return false;
    }
}

function checklname(msg) {
    var pattern = /^[a-z A-Z]*$/;
    var name2 = $("#lastName").val();
    if (pattern.test(name2)) {
        $(msg).html("");
        return true;
    }
    else {
        $(msg).html("Should contain only Characters");
        $(msg).show();
        return false;
    }
}

function checkemail(msg) {
    var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#email").val();
    if (pattern1.test(email)) {
        $(msg).html("");
        return true;
    }
    else {
        $(msg).html("Invalid email");
        $(msg).show();
        return false;
    }
}

var BaseUrl = "https://localhost:44371/Reservation/";

$(document).ready(function () {
    debugger;
    LoadCabin();
    LoadSchedule();
    // LoadData();
});

function AddAdult() {
    debugger;
    validData();
    if (fname == true && lname == true && cnic == true && email == true && phone == true && passport == true && nationality == true && cabin == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("ReservationID", 0);
        formdata.append("FirstName", $("#firstName").val());
        formdata.append("Lastname", $("#lastName").val());
        formdata.append("CNIC", $("#cNIC").val());
        formdata.append("Email", $("#email").val());
        formdata.append("Phoneno", $("#phoneno").val());
        formdata.append("PassportNo", $("#passportNo").val());
        /*formdata.append("Nationality", $("#nationality").val());*/
        formdata.append("Nationality", $("#nationality option:selected").val());
        formdata.append("CabinID", $("#cabinID option:selected").val());
        formdata.append("RouteId", $("#hdnRouteId").val());
        formdata.append("FlightScheduleId", $("#hdnScheduleId").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddAdult/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 3000,
                    message: 'Adult added in queue',
                });
                var html = '';

                html += '<ul>';
                html += '<li>Fare per adult <span>Rs.' + data.fareList[0].fare + '</span></li>';
                html += '<li > Adult x ' + data.adultCount + ' <span>Rs.' + data.totalFare + '</span></li>';
                html += '<li>Total Payable<span>Rs.' + data.totalFare + '</span></li>';
                html += '</ul > ';
                $('#adultFareData').html(html);
            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
                    position: 'center',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

function AddReservation() {
    debugger;
    validData();
    if (fname == true && lname == true && cnic == true && email == true && phone == true && passport == true && nationality == true && cabin == true) {
        $.ajax({
            type: 'POST',
            url: BaseUrl + "BookingDetail/",
            success: function (data) {
                debugger;
                ClearTextBoxes();
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 10000,
                    message: 'Your Booking has been created Successfully PLease check your Reservation Code before Refresh Or Leave this page',
                });
                $('.reservationMsg').html('<p>Reservation has been completed. Reservation code is <span class="text-danger">"' + data.resCode + '"</span></p>');
                $('#myfare').html('');
                $('#adultFareData').html('');
            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
                    position: 'center',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

function LoadFare() {
    debugger;
    var routeId = $('#hdnRouteId').val();
    var cabinId = $("#CabinID option:selected").val();
    // var adults = $("#ddlAdults option:selected").val();

    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Reservation/LoadFare",
        data: { cabinId: cabinId, routeId: routeId },
        dataType: 'JSON',
        success: function (data) {

            debugger;
            var html = 'Fare per adult Rs : ' + data.fare + '/-'
            $('#myfare').html(html);
        },
        error: function (data) {
            var html = 'Fare data not available.'
            $('#myfare').html(html);
        }
    });
}

function LoadCabin() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Cabin/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CabinID" class="form-control">';
            html += '<option value="-1">--- Select Cabin ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CabinId + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcabin"></span>';
            $('#cabinID').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadSchedule() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Schedule/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="FlightScheduleId" class="form-control">';
            html += '<option value="-1">--- Select Flight Schdule ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MySchedule.FlightScheduleID + '">' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ') </option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgfschedule"></span>';
            $('#flightScheduleId').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function ClearTextBoxes() {
    $('#ReservationID').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#cNIC').val("");
    $('#email').val("");
    $('#phoneno').val("");
    $('#passportNo').val("");
    $('#cabinID').val(-1);
    $('#nationality').val(-1);
}
