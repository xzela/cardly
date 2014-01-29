var express = require('express'),
	exphbs  = require('express3-handlebars'),
	hbsConfig = require('./config/handlebars.js');

var app = express();


console.log(hbsConfig);

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');
app.use(express.bodyParser());

// load the routes last!
var routes = require('./routes.js')(app);

app.listen(3000);
