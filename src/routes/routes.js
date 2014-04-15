var users = require('./public/user'),
	_users = require('./app/users'),
	log = require('log4js');

var logger = log.getLogger(__filename);

module.exports = function (app) {
	app.get('/', function (req, res) {
		var string = 'string';
		res.render('home', {data: string});
	});
	app.get('/app/users', _users.all);
	app.get('/app/users/:id', _users.byId);

	app.post('/signup', users.signup);
};
