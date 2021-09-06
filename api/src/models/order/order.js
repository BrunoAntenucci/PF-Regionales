const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: {
        type: Schema.ObjectId,
        ref: "Cart"
    },
    status: {
        type: String,
        enum: ["Creada", "Procesando", "Cancelada", "Completa"],
        default: "Creada"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;