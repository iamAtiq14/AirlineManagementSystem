
var isnameValid = false;
var iscityValid = false;
var isstatusValid = false;

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
        checkname("#name")
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

function checkname(msg) {
    var pattern = /^(?![\s.]+$)[a-z A-Z\s.]*$/;
    var name = $("#Name").val();
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

function validData() {
    isnameValid = validdate('#Name', '#name', 'AirPort Name');
    iscityValid = validdateDropDowns('#ddlcity', '#msgCity', 'City Name');
    isstatusValid = validdateDropDowns('#Status', '#msgStatus', 'Status');;

}

var BaseUrl = "https://localhost:44371/AirPort/";


$(document).ready(function () {
    debugger;
    LoadCity();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldairport').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    validData();
    if (isnameValid == true && iscityValid == true && isstatusValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("AirportID", 0);
        formdata.append("AirportName", $("#Name").val());
        formdata.append("CityID", $("#ddlcity option:selected").val());
        formdata.append("Status", $("#Status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddAirport/",
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

function LoadCity() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/City/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CityID" class="form-control">';
            html += '<option value="-1">--- Select City ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].MyCity.CityId + '">' + data[i].MyCity.CityName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgCity"></span>';
            $('#ddlcity').html(html);
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
        if (data[i].MyAirPort.Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].MyAirPort.AirportName + '</td><td>' + data[i].MyCity.CityName + '</td><td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyAirPort.AirportID + ')"><i>Edit</i></a></tr>'
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?AID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldairport').val(data.AirportID);
            $('#Name').val(data.AirportName);
            $('#ddlcity option:selected').val(data.CityID);
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
    formdata.append("AirportID", $('#hdnfieldairport').val());
    formdata.append("AirportName", $("#Name").val());
    formdata.append("CityID", $("#ddlcity option:selected").val());
    formdata.append("Status", $("#Status option:selected").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddAirport/",
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
    $('#AirportID').val("");
    $('#Name').val("");
    $('#CityID').val(-1);
    $('#Status').val(-1);
}