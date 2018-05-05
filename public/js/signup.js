function login() {
    var XHR = new XMLHttpRequest();

    XHR.open('GET', '/get_workspace_id/' + document.getElementById("workspaceID").value);
    XHR.send();
    XHR.onreadystatechange = function() {
        if (XHR.readyState == XMLHttpRequest.DONE) {
            console.log(XHR.responseText);
            if (XHR.responseText.charAt(0) == "0") {
                document.getElementById("error_message").appendChild(document.createTextNode(XHR.responseText.substring(1)));
            } else {
                var workspaceID = XHR.responseText.substring(1);
                var data_pairs = [];
                var url_encoded_data = "";

                data_pairs.push(encodeURIComponent("firstname") + '=' + encodeURIComponent(document.getElementById("firstname").value));
                data_pairs.push(encodeURIComponent("lastname") + '=' + encodeURIComponent(document.getElementById("lastname").value));
                data_pairs.push(encodeURIComponent("email") + '=' + encodeURIComponent(document.getElementById("email").value));
                data_pairs.push(encodeURIComponent("password") + '=' + encodeURIComponent(document.getElementById("password").value));

                url_encoded_data = data_pairs.join('&').replace(/%20/g, '+');

                var XHR1 = new XMLHttpRequest();

                console.log(url_encoded_data);
                XHR1.open('POST', '/submit_user');
                XHR1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                XHR1.send(url_encoded_data);

                XHR1.onreadystatechange = function () {
                    if (XHR1.readyState == XMLHttpRequest.DONE) {
                        console.log(XHR1.responseText);

                        if (XHR1.responseText.charAt(0) == "0") {
                            document.getElementById("error_message").appendChild(document.createTextNode(XHR1.responseText.substring(1)));
                        } else {
                            var userID = XHR1.responseText.substring(1);

                            data_pairs = [];
                            url_encoded_data = "";

                            data_pairs.push(encodeURIComponent("workspaceID") + '=' + encodeURIComponent(workspaceID));
                            data_pairs.push(encodeURIComponent("userID") + '=' + encodeURIComponent(userID));
                            data_pairs.push(encodeURIComponent("user_role") + '=' + encodeURIComponent("user"));

                            url_encoded_data = data_pairs.join('&').replace(/%20/g, '+');

                            var XHR2 = new XMLHttpRequest();
                            XHR2.open('POST', '/add_user');
                            XHR2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            XHR2.send(url_encoded_data);

                            XHR2.onreadystatechange = function () {
                                if (XHR2.readyState == XMLHttpRequest.DONE) {
                                    if (XHR1.responseText.charAt(0) == "0") {
                                        document.getElementById("error_message").appendChild(document.createTextNode("Error: Database error"));
                                    } else {
                                        window.location.href = "/board_page";
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }}}
