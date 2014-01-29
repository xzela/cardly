var signup = require('../schemas/Signup.js');
var config = {
	db: 'mongodb://localhost/cardly',
	schemas: {
		signup: signup
	}
};

module.exports = config;
