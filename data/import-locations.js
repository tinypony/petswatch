var mongoose = require('mongoose');
var configDB = require('../config/database.js')();
var City = require('../models/location.js');

mongoose.connect(configDB.url); // connect to our database

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.json', 'utf8'));

City.collection.insert(obj, function(err, docs){
 	if (err) {
        console.log(err);
    } else {
        console.info('%d cities were successfully stored.', docs.length);
    }

});

