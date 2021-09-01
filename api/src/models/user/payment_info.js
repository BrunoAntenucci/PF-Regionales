const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const paymentInfoSchema = new Schema({
    bank: {
        type: String,
        required: true
    },
    first_name_CC: {
        type: String,
        required: true
    },
    last_name_CC: {
        type: String,
        required: true
    },
    number_CC: {
        type: Number,
        required: true
    },
    expiration_date_CC: {
        type: String,
        required: true
    },
    security_number_CC: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const PaymentInfo = mongoose.model("PaymentInfo", paymentInfoSchema);

module.exports = PaymentInfo;