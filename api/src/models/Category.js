const { Schema , model } = require("mongoose")

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true  
    },
    product: [{type: Schema.ObjectId, ref: 'Product',}]
    
}, { timestamps: true, versionKey: false});



module.exports = model("Category", CategorySchema);