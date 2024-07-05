
var isnmaeValid = false;
var isstatusValid = false;
var isbussValid = false;
var iseconoValid = false;

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
        checkname("#name");
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
    isnmaeValid = validdate('#Name', '#name', 'AirLine Name');
    isstatusValid = validdate('#BusinessCabin', '#msgBusinessCabin', 'BusinessCabin');
    isbussValid = validdate('#EconomyCabin', '#msgEconomyCabin', 'EconomyCabin');
    // isvalid = validdate('#TotalSeats', '#msgTotalSeats', 'TotalSeats');
    iseconoValid = validdateDropDowns('#Status', '#msgStatus', 'Status');;

}

function checkname(msg) {
    var pattern = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
    var name = $("#Name").val();
    if (pattern.test(name)) {
        $(msg).html("Already Choosed");
        return false;
    }
    else {

        $(msg).html("");
        $(msg).show();
        return true;
    }
}

var BaseUrl = "https://localhost:44371/AirLine/";

$(document).ready(function () {
    debugger;
    LoadData();
});

function SubmitData() {
    debugger;
    if ($('#hdnfieldAirlineId').val() != "") {
        Update();
    }
    else {
        Add();
    }
}

function Add() {
    validData();
    if (isnameValid = true && isstatusValid == true && isbussValid == true && iseconoValid == true) {
        var formdata = new FormData();
        debugger;
        formdata.append("AirlineID", 0);
        formdata.append("Name", $("#Name").val());
        formdata.append("BusinessCabin", $("#BusinessCabin").val());
        formdata.append("EconomyCabin", $("#EconomyCabin").val());
        formdata.append("TotalSeats", $("#TotalSeats").val());
        formdata.append("Status", $("#Status option:selected").val());
        $.ajax({
            type: 'POST',
            url: BaseUrl + "AddAirLine/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    checkname("#name");
                    iziToast.error({
                        title: 'Sorry This Name Already Choosed please choose another name',
                        position: 'center',
                        timeout: 4000
                    });
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
        if (data[i].Status == 0) {
            status = '<span class="badge badge-danger">InActive</span>';
        }
        else {
            status = '<span class="badge badge-success">Active</span>';
        }
        var totalSeats = data[i].BusinessCabin + data[i].EconomyCabin;
        html += '<tr style="color:black!important"><td>' + (i + 1) + '</td><td>' + data[i].Name + '</td><td>' + data[i].BusinessCabin + '</td><td>' + data[i].EconomyCabin + '</td><td>' + totalSeats + '</td><td>' + status + '</td>';
        html += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + data[i].AirlineID + ')"><i>Edit</i></a></tr>'
    }
    $('#mytable').html(html);
}

function Edit(id) {
    debugger;
    $.ajax({

        url: BaseUrl + 'EditById?AId=' + id,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: 'JSON',

        success: function (data) {
            debugger;
            $('#hdnfieldAirlineId').val(data.AirlineID);
            $('#Name').val(data.Name);
            $('#BusinessCabin').val(data.BusinessCabin);
            $('#EconomyCabin').val(data.EconomyCabin);
            /* $('#TotalSeats').val(data.totalSeats);*/
            $('#Status option:selected').val(data.Status);
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
    formdata.append("AirlineID", $('#hdnfieldAirlineId').val());
    formdata.append("Name", $("#Name").val());
    formdata.append("BusinessCabin", $("#BusinessCabin").val());
    formdata.append("EconomyCabin", $("#EconomyCabin").val());
    formdata.append("TotalSeats", $("#TotalSeats").val());
    formdata.append("Status", $("#Status option:selected").val());
    $.ajax({
        type: 'POST',
        url: BaseUrl + "AddAirLine/",
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
    $('#AirlineID').val("");
    $('#Name').val("");
    $('#BusinessCabin').val("");
    $('#EconomyCabin').val("");
    $('#TotalSeats').val("");
    $('#Status').val(-1);
}