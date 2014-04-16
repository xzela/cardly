var log = require('log4js');

var logger = log.getLogger(__filename);

if (process.env.NODE_ENV === 'production') {
	logger.info("Running application in PRODUCTION mode");
	var server = require('./server');
} else {
	logger.info("Running application in DEV mode");
	var app = require('./app');
}
