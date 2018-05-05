var mongoose = require('mongoose');
var post_its = mongoose.Schema(
    {
        "workspaceID":String,
        "userID":String,
        "postItContent":String,
        "anonymous":String
    }
);
mongoose.model('post_its', post_its);