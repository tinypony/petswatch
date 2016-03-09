module.exports = {
	mockRequest: function mockRequest() {
		var req = {
			params: {},
			query: {},
			login: function(user, cb) { cb(); return this; }
		};

		spyOn(req, 'login').and.callThrough();
		return req;
	},

	mockResponse: function mockResponse() {
		var resp = {
			status: function() { return this; },
			send: function() { return this; },
			json: function() { return this; }
		};

		spyOn(resp, 'status').and.callThrough();
		spyOn(resp, 'send').and.callThrough();
		spyOn(resp, 'json').and.callThrough();
		return resp;
	}
}