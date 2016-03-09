var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
	image_url: {type: String, default: '/media/no_image.png'},
	manufacturer: String,
    model: String,
    numberSold: Number,
    description: String,
    attributes: mongoose.Schema.Types.Mixed,
    category: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Product', ProductSchema);