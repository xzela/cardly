var Users = require('../../modules/Users'),
	log = require('log4js');

var logger = log.getLogger(__filename);

/**
 * [_get description]
 *
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var all = function (request, response) {
	var users = new Users();
	users.on("success", function (data) {
		response.json(data);
	});
	users.on("error", function (error) {
		logger.error(error);
		response.json(error);
	});
	users.getAll();
};

var byId = function (request, response) {
	var users = new Users();
	var id = request.params.id;
	users.on("success", function (data) {
		response.json(data);
	});
	users.on("error", function (error) {
		logger.error(error);
		response.json(error);
	});
	users.getById(id);
};

exports.all = all;
exports.byId = byId;
