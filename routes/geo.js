var City = require('../models/location.js');

module.exports = {
	searchCity: function(req, res) {
		if(req.query.search && req.query.search.length > 2) {
			var searchByName = req.query.search;

			City.find({
				name: {
					"$regex": searchByName,
					"$options": "i"
				}
			}).sort({
				"population": "-1"
			}).exec(function(err, cities) {
				if(err) {
					return res.status(400).json(err);
				}
				res.status(200).json(cities);
			});
		} else {
			return res.status(400).send("Must provide a search string");
		}
	}
};