function login() {
    document.getElementById("error_message").innerText = "";
    var username = document.getElementById("username");
    var pass = document.getElementById("password");

    if (username.value == "") {
        document.getElementById("error_message").appendChild(document.createTextNode("Error: Please enter an email"));
    } else if (pass.value  == "") {
        document.getElementById("error_message").appendChild(document.createTextNode("Error: Please enter a password"));
    } else {
        var data_pairs = [];
        var url_encoded_data = "";

        data_pairs.push(encodeURIComponent("email") + '=' + encodeURIComponent(document.getElementById("username").value));
        data_pairs.push(encodeURIComponent("password") + '=' + encodeURIComponent(document.getElementById("password").value));

        url_encoded_data = data_pairs.join('&').replace(/%20/g, '+');

        var XHR = new XMLHttpRequest();

        XHR.open('POST', '/log_in');
        XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XHR.send(url_encoded_data);

        XHR.onreadystatechange = function() {
            if (XHR.readyState == XMLHttpRequest.DONE) {
                console.log(XHR.responseText);
                if (XHR.responseText.charAt(0) == "0") {
                    document.getElementById("error_message").appendChild(document.createTextNode(XHR.responseText.substring(1)));
                } else {
                    window.location.href="/board_page";
                }

            }
        }


    }
}