const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                type: Schema.ObjectId,
                ref: "Product"
            }
        ],
        required: false
    },
    address: {
        type: String,
        required: true
    },
    reputation: {
        type: Number,
        required: true
    }
}, { timestamps: true} )

const Store = mongoose.model("Store", storeSchema)

module.exports = Store;