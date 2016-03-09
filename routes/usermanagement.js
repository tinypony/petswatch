var _ = require('underscore');

module.exports = function(passport) {
    return {
        logout: function(req, res) {
            req.logout();
            res.redirect('/');
        },
        signup: function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
                if (err) { 
                    return next(err); 
                }

                if (!user) { 
                    return res.status(400).json(info); 
                } else {
                    req.login(user, function(err) {
                        if (err) { 
                            return next(err);
                        }
                        return res.status(200).send('OK');
                    });
                }
            })(req,res,next);
        },
        currentUser: function(req, res) {
            res.json({
                authenticated: req.isAuthenticated(),
                user: req.user
            });
        },
        login: function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) { 
                    return next(err); 
                }

                if (!user) { 
                    return res.status(401).json(info);
                }

                req.login(user, function(err) {
                    if (err) { 
                        return next(err);
                    }
                    return res.send(200);
                });
            })(req, res,next);
        }
    };
};