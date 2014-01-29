
var signup = {
	get: function (req, res) {
		res.send(404, 'no gets allow');
	},
	post: function (req, res) {
		var body = req.body;
		if (body.email !== undefined && body.name !== undefined) {
			var json = {name: body.name, email: body.email};
			res.send(201, json);
		} else {
			res.send(404);
		}
	}
};

module.exports = signup;
