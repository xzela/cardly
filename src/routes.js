
var index = require('./controllers/index.js');
var signup = require('./controllers/signup.js');

module.exports = function (app) {
	app.get('/', index.get);
	app.get('/signup', signup.get);
	app.post('/signup', signup.post);
};
