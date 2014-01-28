var express = require('express'),
	exphbs  = require('express3-handlebars'),
	hbsConfig = require('./config/handlebars.js');


var app = express();

console.log(hbsConfig);

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	var string = "from the route";
	res.render('home', {data: string});
});

app.listen(3000);
