const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const itemSchema = new Schema({
//     productId: {
//         type: Schema.ObjectId,
//         ref: "Product"
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: [1, "Quantity can not be less then 1."]
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     total: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// });

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
    order: {
        type: String,
        enum: ["Sin accion", "Creada", "Procesando", "Cancelada", "Completa"],
        default: "Sin accion"
    },
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;