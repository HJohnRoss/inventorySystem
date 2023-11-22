const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	productName:
	{
		type: String,
		required: [
			true,
			"Product Name is required"
		]
	},
	skus: {
		type: [Object],
		default: []
	},
	quantity: {
		type: Number,
		default: 0
	}
}, { timestamps: true })

module.exports.Product = mongoose.model('Product', ProductSchema)