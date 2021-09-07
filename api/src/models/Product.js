const {Schema,model} = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2')
// const mongoPopulate = require('mongoose-autopopulate')


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
    category: [{
        type: Schema.ObjectId,
        ref: "Category",
    }],
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

// ProductSchema.plugin(mongoosePaginate)
// ProductSchema.plugin(mongoPopulate);

module.exports = model("Product", ProductSchema);