var mongoose = require('mongoose');

// define the schema for our user model
var citySchema = mongoose.Schema({
    "elevation": Number, 
    "name": String, 
    "modification_date": String, 
    "geonameid": {
        type: Number,
        unique: true
    },
    "feature_class": String, 
    "admin3_code": String, 
    "admin2_code": String, 
    "longitude": Number, 
    "cc2": String, 
    "timezone": String, 
    "latitude": Number, 
    "feature_code": String, 
    "dem": Number, 
    "country_code": String, 
    "admin1_code": String, 
    "alternatenames": String, 
    "asciiname": String, 
    "admin4_code": String, 
    "population": Number
});


// create the model for users and expose it to our app
module.exports = mongoose.model('City', citySchema);