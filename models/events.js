var mongoose = require('mongoose');
var events = mongoose.Schema(
    {
        "workspaceID":String,
        "userID":String,
        "eventName":String,
        "location":String,
        "date": String,
        "startTime": String,
        "endTime": String
    }
);
mongoose.model('events', events);