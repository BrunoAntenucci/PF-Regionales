const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')



const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
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
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
    quantity: {
        type: Number
    },
    image: {
        type : String,
        required: true
    }
        
}, {
    timestamps: true, versionKey: false
})

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Product", ProductSchema);