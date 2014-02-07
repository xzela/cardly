var express = require('express'),
	exphbs  = require('express3-handlebars'),
	mongoose = require('mongoose'),
	hbsConfig = require('./config/handlebars.js'),
	mongoConfig = require('./config/mongo.js'),
	expressValidator = require('express-validator');



var app = express();

app.configure(function () {
	app.set('port', 3000);
});

app.use(express.static(__dirname));


console.log(hbsConfig);

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');
app.use(express.bodyParser());
app.use(expressValidator());

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(mongoConfig.db, options);
  mongoose.model("signup", mongoConfig.schemas.signup);
};
connect();

// load the routes last!
require('./routes.js')(app);

app.listen(app.get('port'), function () {
	console.log('Server started on port: ' + app.get('port'));
});
