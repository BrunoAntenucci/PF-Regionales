const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    user: {
        type: Schema.ObjectId, 
        ref: "User" 
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: String,
        trim: true,
        required: true,
    },
    priceInOffer: {
        type: String,
    },
    isInOffer : {
        type: Boolean,
        enum: [false, true],
        default: false
    },
    category: [{
        type: Schema.ObjectId,
        ref: "Category",
    }],
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type : String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true, versionKey: false
})

module.exports = model("Product", ProductSchema);