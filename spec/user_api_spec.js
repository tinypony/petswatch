var UserAPI = require('../routes/user_api.js');
var UserModel = require('../models/user.js');
var Mock = require('./mock.js');

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var mockUserJSON = {
    "local": {
        "password": "$2a$08$PHNf2A7vvQ.ShvQ6ZU5yau1xWA9tw58Nyn.mPIdKx2uvJyEQsZ..2",
        "email": "admin@mail.com"
    },
    "groups": [
        "user"
    ],
    "profile": {
        "name": "penis",
        "pets": [],
        "supervising": {
            "unavailable": [],
            "enabled": false
        }
    }
};

describe('User API', function() {
	var res, req, persistedUser;

	beforeAll(function(done) {
		mongoose.connect('mongodb://localhost/petswatch', function(err) {
	    	done();
	    });
	});

	afterAll(function(done) {
		mongoose.unmock(function(){
			done();
		});
	});

	beforeEach(function(done){
		res = Mock.mockResponse();
		req = Mock.mockRequest();

    	UserModel.create(mockUserJSON, function(err, user) {
    		expect(err).toBeFalsy();
    		persistedUser = user;
    		expect(persistedUser._id).toBeTruthy();
    		done();
    	});
	});

	afterEach(function(done) {
		mockgoose.reset(done);
	});

	it('returns error if user is not authenticated', function() {
		res = Mock.mockResponse();
		req = Mock.mockRequest();

		UserAPI.updateSelf(req, res);
		expect(res.status).toHaveBeenCalledWith(403);
	});

	it('updates only profile part', function(done) {
		res = Mock.mockResponse();
		req = Mock.mockRequest();

		req.user = persistedUser;
		req.body = {
			name: "somename",
			email: "hei@gmail.com"
		};

		UserAPI.updateSelf(req, res);

		setTimeout(function() {
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json.calls.argsFor(0)[0]["profile"].name).toBe("somename");
			UserModel.findOne({_id: persistedUser._id}, function(err, us) {
				expect(us.local.email).toBe('admin@mail.com');
				done();
			});
		}, 10);
	});
});