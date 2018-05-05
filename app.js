const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

require('./models/db.js');

const router = require('./routes/routes.js');

// set the static files location
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');



// rountes
app.use('/', router);

app.listen(PORT, function(){
    console.log(`Express listening on post ${PORT}`);
});