
var isValid = false;

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
        checkemail("#email");
       // checkphone("#contact");
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

function checkemail(msg) {
    var pattern1 = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#Email").val();
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
//function checkphone(msg) {
//    var pattern1 = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
//    var contact = $("#Contact").val();
//    if (pattern1.test(contact)) {
//        $(msg).html("");
//        return true;
//    }
//    else {
//        $(msg).html("Invalid Contact Number");
//        $(msg).show();
//        return false;
//    }
//}


function validData() {
    isValid = validdate('#Name', '#msgName', 'Name ');
    isValid = validdate('#Email', '#email', 'Email ');
    isvalid = validdate('#Contact', '#contact', 'Contact');
    isvalid = validdate('#Address', '#address', 'Address');
    isvalid = validdate('#Password', '#password', 'Password');
    isvalid = validdate('#Image', '#image', 'Image');

}

var BaseUrl = "https://localhost:44371/Account/";

function RegisterAdmin() {
    validData();
    if (isValid) {
        var image = $("#Image").get(0).files;
        var formdata = new FormData();
        debugger;
        formdata.append("AdminId", 0);
        formdata.append("Name", $("#Name").val());
        formdata.append("Email", $("#Email").val());
        formdata.append("Contact", $("#Contact").val());
        formdata.append("Address", $("#Address").val());
        formdata.append("Password", $("#Password").val());
        formdata.append("MyImage", image[0]);
        $.ajax({
            type: 'POST',
            url: BaseUrl + "SignUp/",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                iziToast.success({
                    title: 'OK',
                    position: 'center',
                    timeout: 3000,
                    message: 'Your Account has been created Successfully',
                });
            },
            error: function (data) {
                debugger;
                iziToast.error({
                    title: 'Error',
                    message: 'Illegal operation',
                });
            }
        });
    }
}
function LogInValid() {

    isValid = validdate('#Email', '#msgemail', 'Email');
    isvalid = validdate('#Password', '#msgpasword', 'Password');
}

function LoginAdmin() {
    LogInValid();
    debugger;
    if (isValid) {
        var adminObj = {
            email: $("#Email").val(),
            password: $("#Password").val()
        }

        $.ajax({
            type: 'POST',
            url: BaseUrl + "LogIn/",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'JSON',
            data: JSON.stringify(adminObj),
            success: function (data) {
                debugger;
                if (data.msg == true) {
                    var url = "https://localhost:44371/Dashboard/DetailDashboard";
                    location.href = url;
                }
                else {
                    iziToast.error({
                        title: 'OK',
                        position: 'center',
                        timeout: 3000,
                        message: 'Login Failed Email or Password is Incorrect',
                    });
                }
            },
            error: function (data) {
                iziToast.error({
                    title: 'Error',
                    message: 'Illegal operation',
                });
            }
        });
    }
}

$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "Password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "Password");
    }
});