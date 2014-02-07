var express = require('express'),
	exphbs  = require('express3-handlebars'),
	mongoose = require('mongoose'),
	hbsConfig = require('./config/handlebars.js'),
	mongoConfig = require('./config/mongo.js');


var app = express();

app.use(express.static(__dirname));


console.log(hbsConfig);

app.engine('.hbs', exphbs(hbsConfig));
app.set('view engine', '.hbs');
app.use(express.bodyParser());


var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(mongoConfig.db, options);
  mongoose.model("signup", mongoConfig.schemas.signup);
};
connect();

// load the routes last!
require('./routes.js')(app);

app.listen(3000);
