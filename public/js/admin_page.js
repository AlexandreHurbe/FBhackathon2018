function create_posts_table() {

    var XHR = new XMLHttpRequest();

    XHR.open('GET', '/get_post_its');
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send();

    XHR.onreadystatechange = function() {

        innertable = '<table border = 1><tbody>';
        innertable += '<tr>';
        innertable += '<td>' + 'Content' + '</td>';
        innertable += '<td>' + 'UserID' + '</td>';
        innertable += '</tr>';
        if (XHR.readyState == XMLHttpRequest.DONE) {
            var post_its = JSON.parse(XHR.responseText);
            post_its.reverse();
            console.log(post_its);
            for (var i in post_its) {
                innertable += '<tr>';
                if (!document.getElementById(post_its[i]._id)) {
                    innertable += '<td>' + post_its[i].postItContent + '</td>';
                    innertable += '<td>' + post_its[i].userID.substring(0,4) + '</td>';

                }
                innertable += '</tr>';

            }

        }




        innertable += '</tbody></table>';

        document.getElementById('posts_table').innerHTML = innertable;
        console.log("inntertable: " + innertable);
    };


}

function create_events_table() {
    var XHR = new XMLHttpRequest();

    XHR.open('GET', '/get_events');
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send();

    XHR.onreadystatechange = function() {

        innertable = '<table border = 1><tbody>';
        innertable += '<tr>';
        innertable += '<td>' + 'Even Name' + '</td>';
        innertable += '<td>' + 'Location' + '</td>';
        innertable += '<td>' + 'Date' + '</td>';
        innertable += '<td>' + 'Start Time' + '</td>';
        innertable += '<td>' + 'End Time' + '</td>';
        innertable += '<td>' + 'UserID' + '</td>';
        innertable += '</tr>';

        if (XHR.readyState == XMLHttpRequest.DONE) {
            var events = JSON.parse(XHR.responseText);
            console.log(events);
            for (var i in events) {
                innertable += '<tr>';
                innertable += '<td>' + events[i].eventName + '</td>';
                innertable += '<td>' + events[i].location + '</td>';
                innertable += '<td>' + events[i].date + '</td>';
                innertable += '<td>' + events[i].startTime + '</td>';
                innertable += '<td>' + events[i].endTime + '</td>';
                innertable += '<td>' + events[i].userID.substring(0,4) + '</td>';
                innertable += '</tr>';

            }
        }
        innertable += '</tbody></table>';

        document.getElementById('events_table').innerHTML = innertable;
        console.log("inntertable: " + innertable);
    }


}

window.onload = function () {
    create_posts_table();
    create_events_table();
}