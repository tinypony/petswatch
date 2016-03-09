var mongoose = require('mongoose');

// define the schema for our user model
var petSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    birthday: {
    	type: Date
    },
    description: {
    	type: String
    },
    picture: {
    	type: String
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Pet', petSchema);