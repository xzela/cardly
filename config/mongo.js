var user = require('../schemas/User_schema.js');
var config = {
	db: 'mongodb://localhost/cardly',
	schemas: {
		user: user
	}
};

module.exports = config;
