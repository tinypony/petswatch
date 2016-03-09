//routes.js
var mw = require('./middleware/vamiddleware.js');

module.exports = function(app, passport) {

    var idx = require('./index.js');
    var UserAPI = require('./user_api.js');
    var GeoAPI = require('./geo.js');
    var UsermanagementAPI = require('./usermanagement.js')(passport);

    /**
     * Routes
     */

    // serve index
    app.get('/', idx.index);
    
    app.get('/logout', UsermanagementAPI.logout);
    app.post('/signup', UsermanagementAPI.signup);
    app.get('/current_user', UsermanagementAPI.currentUser);
    app.post('/login', UsermanagementAPI.login);

    app.get('/user', mw.authenticated(), mw.groupAccess('admin'), UserAPI.getList);
    app.put('/user', UserAPI.updateSelf);
    app.get('/geo', GeoAPI.searchCity);

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}