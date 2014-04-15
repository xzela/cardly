var express = require('express'),
	exphbs  = require('express3-handlebars'),
	mongoose = require('mongoose'),
	hbsConfig = require('./config/handlebars.js'),
	mongoConfig = require('./config/mongo.js'),
	expressValidator = require('express-validator'),
	log = require('log4js');

var logger = log.getLogger(__filename);


var app = express();

app.configure(function () {
	app.set('port', 3000);
});

app.use(express.static(__dirname));

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');
app.use(express.bodyParser());
app.use(expressValidator());

var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connection.on('error', function (err) {
		console.error(err);
		console.error('error connecting to Mongo. You will not be able to insert new records');
	});
	mongoose.connect(mongoConfig.db, options);
	mongoose.model("user", mongoConfig.schemas.user);
};
connect();

// load the routes last!
require('./routes/routes.js')(app);

app.listen(app.get('port'), function () {
	console.log('Server started on port: ' + app.get('port'));
});
