
var isnameValid = false;
var iscountryValid = false;
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
    var pattern = /^[a-z A-Z]*$/;
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
    isnameValid = validdate('#Name', '#name', 'Province Name');
    iscountryValid = validdateDropDowns('#ddlcountry', '#msgcountry', 'Country Name');
    isstatusValid = validdateDropDowns('#Status', '#msgStatus', 'Status');;

}

var BaseUrl = "https://localhost:44371/Province/";

$(document).ready(function () {
    debugger;
    LoadCountry();
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldprovince').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    validData();
    if (isnameValid == true && iscountryValid == true && isstatusValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("ProvinceId", 0);
        formdata.append("ProvinceName", $("#Name").val());
        formdata.append("CountryId", $("#ddlcountry option:selected").val());
        formdata.append("Status", $("#Status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddProvince/",
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

function LoadCountry() {
    debugger;
    $.ajax({
        type: 'GET',
        url: "https://localhost:44371/Country/GetData",

        dataType: 'JSON',
        success: function (data) {

            debugger;

            var html = '';
            html += '<select id="CountryId" class="form-control">';
            html += '<option value="-1">--- Select Country ---</option>';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].CountryId + '">' + data[i].CountryName + '</option>';
            }
            /*  */
            html += '</select>';
            html += '<span class="text-danger" id="msgcountry"></span>';
            $('#ddlcountry').html(html);
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
        if (data[i].MyProvince.Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].MyProvince.ProvinceName + '</td><td>' + data[i].MyCountry.CountryName + '</td><td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].MyProvince.ProvinceId + ')"><i>Edit</i></a></tr>'
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?PID=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldprovince').val(data.ProvinceId);
            $('#Name').val(data.ProvinceName);
            $('#ddlcountry option:selected').val(data.CountryId);
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
    formdata.append("ProvinceId", $('#hdnfieldprovince').val());
    formdata.append("ProvinceName", $("#Name").val());
    formdata.append("CountryId", $("#ddlcountry option:selected").val());
    formdata.append("Status", $("#Status option:selected").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddProvince/",
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
    $('#ProvinceId').val("");
    $('#Name').val("");
    $('#CountryId').val(-1);
    $('#Status').val(-1);
}