const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    },
    status: {
        type: String,
        enum: ["Creada", "Procesando", "Cancelada", "Completa"],
        default: "Creada"
    },
    ship_info: { 
        type: Schema.ObjectId, 
        ref: "ShipInfo"
    },
    owner: {
        type: Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;