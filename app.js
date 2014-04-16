var express = require('express'),
	cluster = require('cluster'),
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

app.use(express.static(__dirname + '/public'));

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');
app.use(express.urlencoded());
app.use(express.json());
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
	logger.info('Server started on port: ' + app.get('port'));
	if (!cluster.isMaster) {
		logger.info("I'm a worker thread: " + cluster.worker.id + ":" + cluster.worker.process.pid);
	}

});
