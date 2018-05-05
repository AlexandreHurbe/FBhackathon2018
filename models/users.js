var mongoose = require('mongoose');
var user_schema = mongoose.Schema(
    {
        "firstname":String,
        "lastname":String,
        "email":String,
        "password":String
    }
);
mongoose.model('users', user_schema);