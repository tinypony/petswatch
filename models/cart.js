var mongoose = require('mongoose');

var ShoppingCartSchema = mongoose.Schema({
	ownedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	session: {
		type: String
	},
	products: [{
        count: Number,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            unique: true
        }
    }]
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);