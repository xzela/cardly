var users = require('./public/user.js'),
	log = require('log4js');

var logger = log.getLogger(__filename);

module.exports = function (app) {
	app.get('/', function (req, res) {
		var string = 'string';
		res.render('home', {data: string});
	});
	app.get('/users', users.get);
	app.post('/signup', users.signup);
};
