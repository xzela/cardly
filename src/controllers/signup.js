var mongoose = require('mongoose'),
	Signup = mongoose.model('signup');

var signup = {
	get: function (req, res) {
		res.redirect('/');
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
				console.log('before Signup model');
				var user = new Signup({name: body.name, email: body.email});
				Signup.on('error', function () {
					res.send('ok');
				});
				console.log('after Signup model');
				console.log(user);
				user.save(function (err) {
					console.log(err);
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
