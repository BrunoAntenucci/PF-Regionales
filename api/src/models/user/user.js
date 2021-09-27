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
    roles: {
        type: Schema.ObjectId,
        ref: "Role"
    },
    role: {
        type: String,
        enum: ["User", "Admin", "SuperAdmin"],
        default: "User"
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
    },
    order: [{
        type: Schema.ObjectId,
        ref: "Order"
    }],
    petitions: [{
        type: Schema.ObjectId,
        ref: "Petition"
    }],
    storesOwn: [{
        type: Schema.ObjectId,
        ref: "Store"
    }],
    productsOwn: [{
        type: Schema.ObjectId,
        ref: "Product"
    }],
    petitionsAsVendor: [{
        type: Schema.ObjectId,
        ref: "Order"
    }],
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpires: {
        type: Date,
        default: undefined
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false })

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) { //no utilizo arrow function para tener mayor scope.
    return bcrypt.compareSync(password, this.password); //Retorna true o false dependiendo si la comparacion es correcta o no.
}

const User = mongoose.model("User", userSchema);

module.exports = User;