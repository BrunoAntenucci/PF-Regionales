const mongoose = require('mongoose')
const  Schema  = mongoose.Schema



const CategorySchema =  new Schema({
    name: {
        type: String,
        required: true
    },

    id_product: Number,
    id_store: Number
    }, { timestamps: true })

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
