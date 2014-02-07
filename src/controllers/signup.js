var mongoose = require('mongoose'),
	Signup = mongoose.model('signup');

var signup = {
	get: function (req, res) {
		res.send(404, 'no gets allow');
	},
	post: function (req, res) {
		var body = req.body;
		if (body.email !== undefined && body.name !== undefined) {
			req.assert('name', 'Your name is required').notEmpty();
			req.assert('name', 'Your name must be character long').len(1);
			req.assert('email', 'Your email address is required').notEmpty();
			req.assert('email', 'Your email address is invalid').isEmail();
			var errors = req.validationErrors();
			var json = {name: body.name, email: body.email, errors: errors};
			if (errors) {
				res.render('home', json);
			} else {
				var user = new Signup({name: body.name, email: body.email});
				user.save(function (err) {
					if (err) {
						console.log(err);
						res.send(500);
					}
					console.log("save ok");
					res.render('thanks', json);
				});
			}
		} else {
			res.send(404);
		}
	}
};

module.exports = signup;
