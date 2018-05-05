var mongoose = require('mongoose');
var sessions = mongoose.Schema(
    {
        "userID":String
    }
);
mongoose.model('sessions', sessions);