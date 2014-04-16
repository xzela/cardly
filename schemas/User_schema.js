var mongoose = require('mongoose');

var User = new mongoose.Schema({
	name: String,
	email: String
});

module.exports = User;
