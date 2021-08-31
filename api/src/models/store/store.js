const mongoose = requiere('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        requiered: true
    },
    name: {
        type: String,
        requiered: true
    },
    description: {
        type: String,
        requiered: true
    },
    city: {
        type: String,
        requiered: true
    },
    id_category: {
        type: Array,
        requiered: true
    },
    id_product: {
        type: Array,
        requiered: true
    },
    address: {
        type: String,
        requiered: true
    },
    reputation: {
        type: Number,
        requiered: true
    }
})

const Store = mongoose.model("Store", storeSchema)

module.exports = Store;