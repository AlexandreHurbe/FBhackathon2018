function login() {

    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var pass = document.getElementById("password");
    var pass1 = document.getElementById("con_password");

    if (username.value == "") {

        alert("Enter Username");

    } else if (pass.value  == "") {

        alert("Enter Password");

    } else if(pass.value.localeCompare(pass1.value)){

        alert("Two different password")

    } else if(email.value == ""){

        alert("Enter E-mail");
    }else if(pass1.value == ""){

        alert("Enter confirmed password")
    }else{
        alert("An E-mail has been just sent to you to verify.")
    }
}