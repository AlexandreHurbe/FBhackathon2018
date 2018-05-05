
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
    var dt=Date.parse(date_box.value);

    console.log(date_box.value);
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

function get_postits() {
    var XHR = new XMLHttpRequest();

    XHR.open('GET', '/get_post_its');
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send();

    XHR.onreadystatechange = function() {
        if (XHR.readyState == XMLHttpRequest.DONE) {
            var post_its = JSON.parse(XHR.responseText);
            post_its.reverse();
            console.log(post_its);
            for (var i in post_its) {
                if (!document.getElementById(post_its[i]._id)) {
                    generate_postit(post_its[i].postItContent, post_its[i]._id);
                }

            }
        }
    }
}

function generate_postit(postit_text, postit_id) {
    var text = postit_text


    var postitsdiv = document.getElementById('postits');
    var postitsparent = document.getElementById('posits_parent')
    console.log(document.getElementById('postits').offsetHeight);
    console.log(document.getElementById('postits_parent').offsetWidth);
    var sticky = document.createElement("DIV");
    sticky.className = "posted_sticky";
    sticky.id = postit_id;
    var p = document.createElement("P");
    p.appendChild(document.createTextNode(text));
    sticky_text = document.createElement("DIV");
    sticky_text.className = "sticky_text";
    sticky_text.appendChild(p);
    sticky.appendChild(sticky_text);
    // create a hide button for hiding posts, shown when hover
    hide_button = document.createElement("img");
    hide_button.className = "hide_posts_button";
    hide_button.src = "/img/cross.png";
    hide_button.style.display = "none";
    postitsdiv.appendChild(hide_button);
    var ran_height = Math.floor(Math.random()*(postits_parent.offsetHeight-250)) + 1 + 50 ;
    var ran_width = Math.floor(Math.random()*(postitsdiv.offsetWidth-250)) + 1;
    console.log(ran_height, ran_height+'px');
    console.log(ran_width, ran_width+'px');
    sticky.style.top = ran_height+'px';
    sticky.style.left = ran_width+'px';
    postitsdiv.appendChild(sticky);
}

function create_postit() {
    var data_pairs = [];
    var url_encoded_data = "";

    data_pairs.push(encodeURIComponent("post_it_content") + '=' + encodeURIComponent(document.getElementById("sticky_submit_text").innerText));
    data_pairs.push(encodeURIComponent("anonymous") + '=' + encodeURIComponent("no"));

    url_encoded_data = data_pairs.join('&').replace(/%20/g, '+');

    var XHR = new XMLHttpRequest();

    XHR.open('POST', '/submit_post_it');
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send(url_encoded_data);

    /*
    XHR.onreadystatechange = function() {
        if (XHR.readyState == XMLHttpRequest.DONE) {

        }
    }*/

    exit_note_submit();

}

/*
<!-- enlarge posts when hover -->


/**
 * $(".posted_sticky").hover(function() {
    $(".hide_posts_button").show();
    },function () {
    $(".hide_posts_button").hide();
});
 */



<!-- Sidebar control -->
function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    document.getElementById("true").style.display = "block"
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
}

get_postits();
window.setInterval(function(){
    get_postits();
}, 1000);


