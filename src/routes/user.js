var Users = require('../modules/Users'),
	log = require('log4js');

var logger = log.getLogger(__filename);
/**
 * [signup description]
 *
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var signup = function (request, response) {
	var body = request.body;
	if (body.email !== undefined && body.name !== undefined) {
		request.assert('name', 'Your name is required').notEmpty();
		request.assert('name', 'Your name must be character long').len(1);
		request.assert('email', 'Your email address is required').notEmpty();
		request.assert('email', 'Your email address is invalid').isEmail();
		var errors = request.validationErrors();
		var json = {name: body.name, email: body.email, errors: errors};
		if (errors) {
			response.render('home', json);
		} else {
			var user = new Users();
			user.on("success", function (data) {
				response.render('thanks', json);
			});
			user.on("error", function (error) {
				response.send(500);
			});
			user.save({name: body.name, email: body.email});
		}
	} else {
		response.send(404);
	}
};

/**
 * [_get description]
 *
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
var _get = function (request, response) {
	var users = new Users();
	users.on("query", function (data) {
		response.json(data);
	});
	users.on("error", function (error) {
		console.log(error);
		response.json(error);
	});
	users.getAll();
};


exports.get = _get;
exports.signup = signup;
// exports.signup = users.signup;
