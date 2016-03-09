module.exports = function(dbPass) {
	if(dbPass) {
		return {
	    		'url' : 'mongodb://petswatch:' + dbPass + '@localhost/vamoto'
		};
	} else {
		return {
			'url': 'mongodb://localhost/petswatch'
		};
	}
};
