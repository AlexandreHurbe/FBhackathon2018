function open_new_note_overlay() {
    document.getElementById("note_submit_overlay").style.display = "block";
}

function open_new_event_overlay() {
    document.getElementById("event_submit_overlay").style.display = "block";
}

function exit_event_submit() {
    document.getElementById("event_submit_overlay").style.display = "none";
}

function exit_note_submit() {
    document.getElementById("sticky_submit_text").innerText = '';
    document.getElementById("note_submit_overlay").style.display = "none";
}

function create_event() {
    var event_name = document.getElementById("event_name_box");
    var location_box = document.getElementById("location_box");
    var date_box = document.getElementById("date_box");
    var time_from_box = document.getElementById("time_from_box");
    var time_to_box = document.getElementById("time_to_box");

    var event_card = document.createElement("DIV");

    var event_name_h1 = document.createElement("H1");
    event_name_h1.className = "event_title";
    var name = document.createTextNode("Event: ");
    event_name_h1.appendChild(name);
    event_name_h1.appendChild(document.createTextNode(event_name.value));
    event_card.appendChild(event_name_h1);

    var location_h2 = document.createElement("H2");
    location_h2.className = "event_location";
    var location = document.createTextNode("Location: ");
    location_h2.appendChild(location);
    location_h2.appendChild(document.createTextNode(location_box.value));
    event_card.appendChild(location_h2);

    var date_h2 = document.createElement("H2");
    date_h2.className = "event_date";
    var date = document.createTextNode("Date: ");
    date_h2.appendChild(date);
    date_h2.appendChild(document.createTextNode(date_box.value));
    event_card.appendChild(date_h2);

    var time_h2 = document.createElement("H2");
    time_h2.className = "event_time";
    var time = document.createTextNode("Time: ");
    time_h2.appendChild(time);
    var time_string = time_from_box.value + "-" + time_to_box.value;
    time_h2.appendChild(document.createTextNode(time_string));
    event_card.appendChild(time_h2);

    event_card.appendChild(document.createElement("BR"));

    event_card.className = "event_card";
    document.getElementById("events").appendChild(event_card);

    event_name.value = "";
    location_box.value = "";
    date_box.value = "";
    time_from_box.value = "";
    time_to_box.value = "";

    exit_event_submit();
}

function create_postit() {
    var text = document.getElementById("sticky_submit_text").innerText;
    exit_note_submit();

    var postitsdiv = document.getElementById('postits');
    var postitsparent = document.getElementById('posits_parent')
    console.log(document.getElementById('postits').offsetHeight);
    console.log(document.getElementById('postits_parent').offsetWidth);
    var sticky = document.createElement("DIV");
    sticky.className = "sticky";
    var p = document.createElement("P");
    p.appendChild(document.createTextNode(text));
    sticky_text = document.createElement("DIV");
    sticky_text.className = "sticky_text";
    sticky_text.appendChild(p);
    sticky.appendChild(sticky_text);
    var ran_height = Math.floor(Math.random()*(postits_parent.offsetHeight-250)) + 1 + 50 ;
    var ran_width = Math.floor(Math.random()*(postitsdiv.offsetWidth-250)) + 1;
    console.log(ran_height, ran_height+'px');
    console.log(ran_width, ran_width+'px');
    sticky.style.top = ran_height+'px';
    sticky.style.left = ran_width+'px';
    postitsdiv.appendChild(sticky);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}


