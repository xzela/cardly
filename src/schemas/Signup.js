var mongoose = require('mongoose');

var signup = new mongoose.Schema({
	name: String,
	email: String
});

module.exports = signup;
