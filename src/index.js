var log = require('log4js');

var logger = log.getLogger(__filename);

// logger.debug(process);

if (process.env.NODE_ENV === 'production') {
	var server = require('./server');
} else {
	var app = require('./app');
}
