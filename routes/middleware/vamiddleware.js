var _ = require('underscore');

module.exports = {
	authenticated: function() {
		return function(req, res, next) {
			if (req.isAuthenticated()) {
		      	next();
			} else {
			    res.send(401, 'Not authenticated');
			}
		};
	},
	groupAccess: function(groupName) {
		return function(req, res, next) {
			if (_.contains(req.user.groups, groupName)) {
		      	next();
			} else {
			    res.send(401, 'No permission');
			}
		};
	}
};