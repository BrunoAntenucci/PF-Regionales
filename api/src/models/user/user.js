const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    ship_info: [{ 
        type: Schema.ObjectId, 
        ref: "ShipInfo"
    }],
    payment_info: [{ 
        type: Schema.ObjectId, 
        ref: "PaymentInfo"
    }],
    cart: {
        type: Schema.ObjectId,
        ref: "Cart"
    }
}, { timestamps: true })

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) { //no utilizo arrow function para tener mayor scope.
    return bcrypt.compareSync(password, this.password); //Retorna true o false dependiendo si la comparacion es correcta o no.
}

const User = mongoose.model("User", userSchema);

module.exports = User;