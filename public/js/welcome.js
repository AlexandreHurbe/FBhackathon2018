function login() {
    window.location.href="/board_page";
}

function open_workspace_overlay() {
    document.getElementById("workplace_overlay").style.display = "block";
    document.getElementById("motivational_message").style.display = "none";
    document.getElementById("login_control").style.display = "none";
}

function exit_workspace_overlay() {
    document.getElementById("workplace_overlay").style.display = "none";
    document.getElementById("motivational_message").style.display = "block";
    document.getElementById("login_control").style.display = "block";
}