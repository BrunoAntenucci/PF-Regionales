const { Schema , model } = require("mongoose")
// const mongoPopulate = require('mongoose-autopopulate')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        
    },
    product: [{type: Schema.Types.ObjectId, ref: 'Product' }]
    
}, { timestamps: true, versionKey: false});

// schema.plugin(require('mongoose-autopopulate'));
// CategorySchema.plugin(mongoPopulate);


module.exports = model("Category", CategorySchema);

