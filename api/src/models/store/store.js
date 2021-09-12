const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
      first_name: { type: String, required: true },
      reputation: { type: Number, required: true },
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
        required: true,
        default: 0
    }, 
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
}, { timestamps: true} )

const Store = mongoose.model("Store", storeSchema)


module.exports = Store;