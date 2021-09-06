const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [{
        product: {
            type: Schema.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
        },
        subTotal: {
            type: Number,
        }
    }],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;