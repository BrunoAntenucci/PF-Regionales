const mongoose = requiere('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    storeId: {
        type: ObjectId,
        auto: true,
        required: true
    },
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
    id_category: {
        type: [
            {
                type: mongoose.ObjectId,
                ref: "Category"
            }
        ],
        required: true
    },
    id_product: {
        type: [
            {
                type: mongoose.ObjectId,
                ref: "Product"
            }
        ],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    reputation: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Store = mongoose.model("Store", storeSchema)

module.exports = Store;