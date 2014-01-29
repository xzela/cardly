var mongoose = require('mongoose');

var users = {
	get: function (req, res) {
		var Signup = mongoose.model('signup');
		var user = new Signup({name: 'cat', email: 'aol@aol2.com'});
		user.save(function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log("save ok");
			}
			res.send(200);
		});
		// Signup.find(function (err, records) {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log(records);
		// 	}
		// 	res.send(200);
		// });
	}
};

module.exports = users;
