var index = {
	get: function (req, res) {
		var string = 'string';
		res.render('home', {data: string});
	}
};

module.exports = index;
