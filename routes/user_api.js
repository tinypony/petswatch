var _ = require('underscore');
var User = require('../models/user.js');


module.exports = {
	getList: function(req, res) {
		User.find({}).exec(function(err, users) {
			if(err) {
				res.status(400).send('Could not fetch users');
			}
			res.json(users);
		});
	},

	updateSelf: function(req, res) {
		if(!req.user || !req.user._id) {
			return res.status(403).json({
				error: "Must be authenticated to update own profile"
			});
		}

		var query = {
			_id: req.user._id
		};

		var updateProfile = req.body;

		User.findOneAndUpdate(query, 
			{ 
				"$set": { profile: updateProfile }
			}, { 
				new: true
			}, 
			function(err, user) {
				if(err) {
					res.status(400).json(err);
				}
				res.status(200).json(user);
		});
	}
};