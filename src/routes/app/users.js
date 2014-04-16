var Users = require('../../modules/Users'),
	log = require('log4js');

var logger = log.getLogger(__filename);

/**
 * Returns all known users
 *
 * @method all
 *
 * @param  {Object} request  Request object
 * @param  {Object} response Response object
 *
 * @return null
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
	users.fetchAll();
};

/**
 * Returns a known user by Id
 *
 * @method byId
 *
 * @param  {Object} request  Request object
 * @param  {Object} response Reponse object
 *
 * @return null
 */
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
