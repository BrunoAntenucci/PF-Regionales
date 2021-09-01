const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const shipInfoSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: Number,
        required: true
    },
    address_name: {
        type: String,
        required: true
    },
    address_number: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const ShipInfo = mongoose.model("ShipInfo", shipInfoSchema);

module.exports = ShipInfo;