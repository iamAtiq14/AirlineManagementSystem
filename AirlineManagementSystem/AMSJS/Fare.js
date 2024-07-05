var isfareValid = false;
var isairlineValid = false;
var iscabinValid = false;
var isrouteValid = false;

function validdate(txt, msg, data) {

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
        return true;
    }
}

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

function validData() {
    isairlineValid = validdateDropDowns('#AirlineId', '#msgAirline', 'Airline Name');
    iscabinValid = validdateDropDowns('#CabinID', '#msgCabin', 'Cabin Name');
    isrouteValid = validdateDropDowns('#RouteID', '#msgRoute', 'Route Name');
    isfareValid = validdate('#fare', '#msgname', 'fare');
}

var BaseUrl = "https://localhost:44371/Fare/";

$(document).ready(function () {
    debugger;
    LoadAirline();
    LoadCabin();
    LoadRoute();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldfare').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    validData();
    if (isfareValid == true && isairlineValid == true && iscabinValid == true && isrouteValid == true ) {
        var formdata = new FormData();
        debugger;
        formdata.append("FareID", 0);
        formdata.append("AirlineId", $("#AirlineId").val());
        formdata.append("CabinID", $("#CabinID").val());
        formdata.append("RouteID", $("#RouteID").val());
        formdata.append("fare", $("#fare").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddFare/",
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
                    message: 'Successfully Addedd',
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
}

function LoadAirline() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/AirLine/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="AirlineId" class="form-control">';
            html += '<option value="-1">--- Select AirLine ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].AirlineID + '">' + data[i].Name + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgAirline"></span>';
            $('#ddlair').html(html);
        },
        error: function (data) {
            alert(data.statusText);
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
            html += '<span class="text-danger" id="msgCabin"></span>';
            $('#ddlcabin').html(html);
        },
        error: function (data) {
            alert(data.statusText);
        }
    });
}

function LoadRoute() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Route/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="RouteID" class="form-control">';
            html += '<option value="-1">--- Select Route ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyRoute.RouteID + '">' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ') </option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgRoute"></span>';
            $('#ddlrouteData').html(html);
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

    var html = '';
    for (var i = 0; i < data.length; i++) {
        debugger;
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].MyAirLine.Name + '</td><td>' + data[i].MyCabin.Name + '</td><td>' + data[i].Cityfrom.CityName + '(' + data[i].Countryfrom.CountryName + ')-- To --' + data[i].Cityto.CityName + '(' + data[i].Countryto.CountryName + ')</td><td>' + data[i].MyFare.fare + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyFare.FareID + ')"><i class="zmdi zmdi-edit"></i></a></td></tr>';
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?FID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldfare').val(data.FareID);
            $('#AirlineId').val(data.AirlineId);
            $('#CabinID').val(data.CabinID);
            $('#RouteID').val(data.RouteID);
            $('#fare').val(data.fare);
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
    formdata.append("FareID", $('#hdnfieldfare').val());
    formdata.append("AirlineId", $("#AirlineId").val());
    formdata.append("CabinID", $("#CabinID").val());
    formdata.append("RouteID", $("#RouteID").val());
    formdata.append("fare", $("#fare").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddFare/",
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

function ClearTextBoxes() {
    $('#FareID').val("");
    $('#AirlineId').val(-1);
    $('#CabinID').val(-1);
    $('#RouteID').val(-1);
    $('#fare').val("");
}