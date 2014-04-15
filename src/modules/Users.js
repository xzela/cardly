var mongoose = require('mongoose'),
	util = require('util'),
	events = require('events'),
	log = require('log4js'),
	UserSchema = mongoose.model('user');

var logger = log.getLogger(__filename);

function Users(options) {
	events.EventEmitter.call(this);
	var self = this;

	this.save = function (data) {
		var user = new UserSchema(data);

		user.on("error", function (error) {
			console.log(error);
			self.emit("error", error);
		});

		user.on("save", function (data) {
			console.log(data);
			self.emit("success", data);
		});
		user.save(data);
	};

	this.getAll = function () {
		UserSchema.find({}, function (error, data) {
			if (error) {
				self.emit("error", error);
			} else {
				self.emit("query", data);
			}
		});
	};
}

util.inherits(Users, events.EventEmitter);
module.exports = Users;
