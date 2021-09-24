const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
      first_name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
       type: Schema.Types.ObjectId,
       required: true,
       ref: 'User',
        },
     },
    {
      timestamps: true,
    }
)

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

        required: false, //Estaba en true
        default: 0

    }, 
    img: {
        type: String,
        required: false
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: false, //Estaba en true
        default: 0,
    },
    owner: {
        type: Schema.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true} )

const Store = mongoose.model("Store", storeSchema)


module.exports = Store;