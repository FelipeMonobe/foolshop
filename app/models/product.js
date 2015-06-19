var mongoose = require('mongoose');

module.exports = function () {
	var schema = mongoose.Schema({
		id: { type: Number, unique: true },
		name: { type: String, required: true },
		stock: { type: Number, default: 0 },
		description: { type: String, default: 'No description given.' },
		brand: { type: String, default: 'Generic' },
		price: { type: Number, required: true },
		creationDate: { type: Date, default: Date.now },
		isActive: { type: Boolean, required: true }
	});
	return mongoose.model('Product', schema);
};