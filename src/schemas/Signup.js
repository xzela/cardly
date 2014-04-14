var mongoose = require('mongoose');

var Signup = new mongoose.Schema({
	name: String,
	email: String
});

module.exports = Signup;
