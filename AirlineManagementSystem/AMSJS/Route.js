
var iscountryfromValid = false;
var iscountrytoValid = false;
var iscityfromValid = false;
var iscitytoValid = false;
var isairportfromValid = false;
var isairporttoValid = false;
var isstatusValid = false;

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
    iscountrytoValid = validdateDropDowns('#ddlcountryto', '#msgctt', 'Country To');
    iscityfromValid = validdateDropDowns1('#ddlcf', '#msgcf', 'City From');
    iscitytoValid = validdateDropDowns1('#ddlct', '#msgct', 'City To');
    isairportfromValid = validdateDropDowns('#ddlaf', '#msgaf', 'Airport From');
    isairporttoValid = validdateDropDowns('#ddlato', '#msgat', 'Airport To');
    isstatusValid = validdateDropDowns('#Status', '#msgstatus', 'Status');

}

var BaseUrl = "https://localhost:44371/Route/";

$(document).ready(function () {
    debugger;
    LoadCountry();
    LoadCountryto();
    //LoadCityfrom();
   // LoadCityto();
   // LoadAirportfrom();
    //LoadAirportto();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldroute').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    debugger;
    var txt1 = $("#ddlcf option:selected").val();
    var txt2 = $("#ddlct option:selected").val();
    var txt3 = $("#ddlaf option:selected").val();
    var txt4 = $("#ddlato option:selected").val();
    validData();
    if (iscountryfromValid == true && iscountrytoValid == true && iscityfromValid == true && iscitytoValid == true && isairportfromValid == true && isairporttoValid == true && isstatusValid == true) {
        debugger;
        var formdata = new FormData();
        formdata.append("RouteID", 0);
        formdata.append("CountryFrom", $("#ddlcountry option:selected").val());
        formdata.append("CountryTo", $("#ddlcountryto option:selected").val());
        formdata.append("CityFrom", $("#ddlcf option:selected").val());
        formdata.append("CityTo", $("#ddlct option:selected").val());
        formdata.append("AirportFrom", $("#ddlaf option:selected").val());
        formdata.append("AirportTo", $("#ddlato option:selected").val());
        formdata.append("Status", $("#Status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddRoute/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data.msg == true && txt1 === txt2) {
                    iziToast.error({
                        title: 'Sorry City to Already Exist please choose another City',
                        position: 'center',
                        timeout: 4000,
                    });
                    $(txt2).css("border-color", "red").val();
                    return false;
                }
                else if (data.msg == true && txt3 === txt4) {
                    iziToast.error({
                        title: 'Sorry Airport From Already Exist please choose Airport',
                        position: 'center',
                        timeout: 4000
                    });
                    return false;
                }
                else {
                    LoadData();
                    ClearTextBoxes();
                    iziToast.success({
                        title: 'OK',
                        position: 'center',
                        timeout: 2000,
                        message: 'Successfully Addedd',
                    });
                    return true;
                }
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

function LoadCountry() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

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
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

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
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,
        dataType: 'JSON',
        success: function (data) {

            debugger;
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
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetDataByCountryId?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

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
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

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
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirPort/GetAirportById?Id=" + id,

        dataType: 'JSON',
        success: function (data) {

            debugger;

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

function LoadData() {
    debugger;
    $.ajax({
        type: 'GET',
        url: BaseUrl + 'GetData/',
        dataType: 'JSON',
        success: function (data) {
            debugger;
            CreateTableRow(data);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function CreateTableRow(data) {
    debugger;
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var status = '';
        if (data[i].MyRoute.Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].Countryfrom.CountryName + '</td><td>' + data[i].Countryto.CountryName + '</td><td>' + data[i].Cityfrom.CityName + '</td><td>' + data[i].Cityto.CityName + '</td><td>' + data[i].Airportfrom.AirportName + '</td><td>' + data[i].Airportto.AirportName + '</td><td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyRoute.RouteID + ')"><i>Edit</i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?RID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldroute').val(data.RouteID);
            $('#ddlcountry').val(data.CountryFrom);
            $('#ddlcountryto').val(data.CountryTo);
            $('#ddlcf').val(data.CityFrom);
            $('#ddlct').val(data.CityTo);
            $('#ddlaf').val(data.AirportFrom);
            $('#ddlato').val(data.AirportTo);
            $('#Status').val(data.Status);
            $('#Modal').modal();
        },
        error: function (data) {
            alert(data.statusText);
        }
    });

}

function Update() {
    debugger;
    var formdata = new FormData();
    debugger;
    formdata.append("RouteID", $('#hdnfieldroute').val());
    formdata.append("CountryFrom", $("#ddlcountry option:selected").val());
    formdata.append("CountryTo", $("#ddlcountryto option:selected").val());
    formdata.append("CityFrom", $("#ddlcf option:selected").val());
    formdata.append("CityTo", $("#ddlct option:selected").val());
    formdata.append("AirportFrom", $("#ddlaf option:selected").val());
    formdata.append("AirportTo", $("#ddlato option:selected").val());
    formdata.append("Status", $("#Status option:selected").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddRoute/",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            debugger;
            LoadData();
            ClearTextBoxes();
            iziToast.success({
                title: 'OK',
                position: 'center',
                timeout: 2000,
                message: 'Successfully Updated',
            });

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

function SelectionValid() {

    var formdata = new FormData();
    debugger;
    $.ajax({
        type: 'POST',
        url: "https://localhost:44371/Schedule/BookingLists",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            debugger;
            if (data.msg == true) {
                iziToast.error({
                    title: 'Sorry Currently Unavilable Please check more',
                    position: 'center',
                    timeout: 4000
                });
            }
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

function ClearTextBoxes() {
    $('#RouteID').val("");
    $('#CountryFrom').val(-1);
    $('#CountryTo').val(-1);
    $('#CityFrom').val(-1);
    $('#CityTo').val(-1);
    $('#AirportFrom').val(-1);
    $('#AirportTo').val(-1);
    $('#Status').val(-1);
}



