const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petitionSchema = new Schema({
    about: {
        type: String,
        enum: ["PRODUCT", "STORE", "CATEGORY"],
        required: true
    },
    dataProduct: {
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            maxlength: 2000
        },
        price: {
            type: String,
            trim: true
        },
        category: [{
            type: Schema.ObjectId,
            ref: "Category"
        }],
        quantity: {
            type: Number,
            default: 1
        },
        image: {
            type: String
        }
    },
    dataStore: {
        name: {
            type: String
        },
        description: {
            type: String
        },
        city: {
            type: String
        },
        address: {
            type: String
        },
        products: [{
            type: Schema.ObjectId,
            ref: "Product"
        }],
        img: {
            type: String
        }
    },
    dataCategory: {
        name: {
            type: String
        }
    },
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["Creada", "Aceptada", "Rechazada"],
        default: "Creada"
    }
})

module.exports = mongoose.model("Petition", petitionSchema);