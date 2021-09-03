const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ms = require("ms")

const guestSchema = new Schema({
    _id: { //usa el sessionID
        type: String,
        required: true
    },
    cart: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],
    role: {
        type: String,
        default: "Guest"
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: ms('2 days'),
      },
}, { timestamps: true }, { _id: false })

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;