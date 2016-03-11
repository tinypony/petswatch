var UserModel = require('../models/user.js');
var Mock = require('./mock.js');
var _ = require('underscore');
var Error = require('../routes/error.js');
var passport  = require('passport')
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
passport.initialize();
passport.session();

mockgoose(mongoose);

var mockUserJSON = {
    "local": {
        "password": "$2a$08$PHNf2A7vvQ.ShvQ6ZU5yau1xWA9tw58Nyn.mPIdKx2uvJyEQsZ..2", //password
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

describe('Usermanagement API', function() {
	var res, req, persistedUser;
	var UsermanagementAPI;

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

	beforeEach(function(done) {
		res = Mock.mockResponse();
		req = Mock.mockRequest();

		require('../config/passport.js')(passport);
		UsermanagementAPI = require('../routes/usermanagement.js')(passport);

	    UserModel.create(mockUserJSON, function(err, user) {
    		persistedUser = user;
    		done();
    	});
	});

	afterEach(function(done) {
		mockgoose.reset(function(){
			done();
		});
	});

	it('returns an error if local email is already used when trying to signup', function(done) {	
		req.body = {
			email: persistedUser.local.email,
			password: "123456789"
		};
		UsermanagementAPI.signup(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(400);
				expect(req.login).not.toHaveBeenCalled();
				done();
			});
	});

	it('returns newly created user upon succesful registration', function(done) {
		req.body = {
			email: "unique_email@gmail.com",
			password: "123456789"
		};
		UsermanagementAPI.signup(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(200);
				expect(res.send).toHaveBeenCalledWith('OK');
				expect(req.login).toHaveBeenCalled();
				done();
			});
	});

	it('returns an error when user cannot be logged in', function(done) {
		req.body = {
			email: "unique_email1@gmail.com",
			password: "123456789"
		};

		UsermanagementAPI.login(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.json).toHaveBeenCalledWith({ failure: 'User not found', code: Error.USER_NOT_FOUND });
				expect(req.login).not.toHaveBeenCalled();
				done();
			});
	});

	it('returns an error when user tries to log in with incorrect password', function(done) {
		req.body = {
			email: "admin@mail.com",
			password: "123456789"
		};
		UsermanagementAPI.login(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.json).toHaveBeenCalledWith({ failure: 'Password is not valid', code: Error.WRONG_PASSWORD });
				expect(req.login).not.toHaveBeenCalled();
				done();
			});
	});

	it('successfully logs user in with correct credentials', function(done) {
		req.body = {
			email: "admin@mail.com",
			password: "password"
		};

		UsermanagementAPI.login(req, res)
			.then(function(){
				expect(res.status).toHaveBeenCalledWith(200);
				done();
			});
	});

	it('does not change password if current password does not match', function(done) {
		req.user = persistedUser;
		req.body = {
			currentPassword: "notvalid",
			newPassword: "newpassword"
		};

		UsermanagementAPI.changePassword(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(403);
				expect(res.json).toHaveBeenCalledWith({ failure: 'Password is not valid', code: Error.WRONG_PASSWORD });
				done();
			});
	});

	it('succesfully changes password if current password matches', function(done) {
		req.user = persistedUser;
		req.body = {
			currentPassword: "password",
			newPassword: "newpassword"
		};

		UsermanagementAPI.changePassword(req, res)
			.then(function() {
				expect(res.status).toHaveBeenCalledWith(200);
				
				var req2 = Mock.mockRequest(),
					res2 = Mock.mockResponse();

				req2.body = {
					email: "admin@mail.com",
					password: "newpassword"
				};

				UsermanagementAPI.login(req2, res2)
					.then(function(){
						expect(res2.status).toHaveBeenCalledWith(200);
						done();
					});
			});
	});
});