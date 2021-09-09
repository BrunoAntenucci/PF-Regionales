const {Schema, model} = require('mongoose');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const FavouritesSchema = Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'user',
	},
	products: [
		{
			_id: false,
			product: {
				type: Schema.ObjectId,
				ref: 'products',
			},
		},
	],
}, { timestamps: true, versionKey: false});

module.exports = model('favourites', FavouritesSchema);