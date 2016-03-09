var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
	name: String,
	isRoot: { type: Boolean, default: true },
	attributes: [],
	subCategories: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Category', CategorySchema);