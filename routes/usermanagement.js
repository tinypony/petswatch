var _ = require('underscore');
var Error = require('./error.js');
var q = require('q');

module.exports = function(passport) {
    return {
        logout: function(req, res) {
            req.logout();
            res.redirect('/');
        },
        signup: function(req, res, next) {
            var deferred = q.defer();

            passport.authenticate('local-signup', function(err, user, info) {
                if (err) { 
                    deferred.resolve();
                    return next(err); 
                }

                if (!user) { 
                    res.status(400).json(info); 
                    return deferred.resolve();
                } else {
                    req.login(user, function(err) {
                        if (err) { 
                            next(err);
                            return deferred.resolve();
                        }
                        res.status(200).send('OK');
                        return deferred.resolve();
                    });
                }
            })(req,res,next);

            return deferred.promise;
        },
        currentUser: function(req, res) {
            res.json({
                authenticated: req.isAuthenticated(),
                user: req.user
            });
        },
        changePassword: function(req, res) {
            var deferred = q.defer();
            var currentPassword = req.body.currentPassword;
            var newPassword = req.body.newPassword;
            
            if(!req.user) {
                req.status(400).send();
                deferred.resolve();
            } else if(!req.user.validPassword(currentPassword)) {
                res.status(403).json({
                    failure: 'Password is not valid',
                    code: Error.WRONG_PASSWORD 
                });
                deferred.resolve();
            } else {
                var user = req.user;
                user.local.password = user.generateHash(newPassword);
                user.save(function(err) {
                    if(err) {
                        res.status(400).json(err);
                        return deferred.resolve();
                    } 

                    res.status(200).send();
                    deferred.resolve();
                });
            }
            
            return deferred.promise;
        },
        login: function(req, res, next) {
            var deferred = q.defer();

            passport.authenticate('local-login', function(err, user, info) {
                if (err) { 
                    deferred.resolve();
                    return next(err); 
                }

                if (!user) { 
                    res.status(401).json(info);
                    return deferred.resolve();
                }

                req.login(user, function(err) {
                    if (err) { 
                        deferred.resolve();
                        return next(err);
                    }

                    res.status(200).send('OK');
                    deferred.resolve();
                });
            })(req, res,next);

            return deferred.promise;
        }
    };
};