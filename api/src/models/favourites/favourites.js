// const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouritesSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
	},
	products: [
		{
			_id: false,
			product: {
				type: Schema.ObjectId,
				ref: 'Product',
			},
		},
	],
}, { timestamps: true, versionKey: false});

const Favourites = mongoose.model("Favourites", favouritesSchema);
module.exports = Favourites;