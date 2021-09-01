const { Schema , model , ObjectId } = require('mongoose')


const productSchema = new Schema({
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
        type: Number,
        trim: true,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number
    },
    image: {
        type : String,
        required: true
    }
    
}, {
    timestamps: true
})

module.exports = model("Product", productSchema)