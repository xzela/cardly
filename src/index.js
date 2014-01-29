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

app.post('/', function (req, res) {
	console.log('post accepted');
	var json = req.body;
	res.send(json);
});

app.listen(3000);
