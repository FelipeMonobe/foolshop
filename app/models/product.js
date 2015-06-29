var mongoose = require('mongoose'),
		autoIncrement = require('mongoose-auto-increment');

module.exports = function () {
	var schema = mongoose.Schema({
		name: { type: String, required: true },
		stock: { type: Number, default: 0 },
		description: { type: String, default: 'No description given.' },
		brand: { type: String, default: 'Generic' },
		price: { type: Number, required: true },
		creationDate: { type: Date, default: Date.now },
		isActive: { type: Boolean, default: true }
	});
	schema.plugin(autoIncrement.plugin, 'Product');
	return mongoose.model('Product', schema);
};
