
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan    = require('morgan'),
  mongoose  = require('mongoose'),
  passport  = require('passport'),
  session   = require('express-session'),
  http      = require('http'),
  path      = require('path');

var app = module.exports = express();
var configDB = require('./config/database.js')();
var MongoStore = require('connect-mongo')(session);

mongoose.connect(configDB.url); // connect to our database

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static('public/app/'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {}

// required for passport
app.use(session({ 
  secret: 'whatislovebabydonthurtmenomore', 
  cookie: { 
    maxAge: 999999999 
  }, 
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection 
  })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport.js')(passport);    //setup passport.js
require('./routes/routes.js')(app, passport); //setup REST API routes

// redirect all others to the index (HTML5 history)
//app.get('/*', express.static(path.join(__dirname, 'public/app/')));

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});