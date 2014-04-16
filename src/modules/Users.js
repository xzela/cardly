var mongoose = require('mongoose'),
	util = require('util'),
	events = require('events'),
	log = require('log4js'),
	UserSchema = mongoose.model('user');

var logger = log.getLogger(__filename);
/**
 * [Users description]
 *
 * @param {[type]} options [description]
 */
function Users(options) {
	events.EventEmitter.call(this);
	var self = this;

	/**
	 * Attempts to save a user object in the document
	 * store
	 *
	 * Will emit either `error` or `success` event
	 *
	 * @method save
	 *
	 * @param  {Object} data Data to be serialized to the
	 *                       document store
	 *                       Should match the schema outline.
	 *                       Required properties: `name: String`, `email: String`
	 *
	 * @return null
	 */
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

	/**
	 * Attempts to fetch all known users from the
	 * documemt store
	 *
	 * Will emit either `error` or `success` event
	 *
	 * @method fetchAll
	 *
	 * @return null
	 */
	this.fetchAll = function () {
		UserSchema.find({}, function (error, data) {
			if (error) {
				self.emit("error", error);
			} else {
				self.emit("success", data);
			}
		});
	};

	/**
	 * Attempts to get a user by a given Id
	 * Will emit either `error` or `success` event
	 *
	 * @methdo getById
	 *
	 * @param  {String} id mongdb `_id`
	 *
	 * @return null
	 */
	this.getById = function (id) {
		// filter by `_id`
		UserSchema.find(
			{_id: id},
			function (error, data) {
				if (error) {
					self.emit("error", error);
				} else {
					self.emit("success", data);
				}
			}
		);
	};
}

util.inherits(Users, events.EventEmitter);
module.exports = Users;
