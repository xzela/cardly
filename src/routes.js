
var index = require('./controllers/index.js');
var signup = require('./controllers/signup.js');
var users = require('./controllers/users.js');

module.exports = function (app) {
	app.get('/', index.get);
	app.get('/users', users.get);
	app.get('/signup', signup.get);
	app.post('/signup', signup.post);
};
