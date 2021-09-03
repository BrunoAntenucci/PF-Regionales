const { Router } = require("express");
const User = require("../models/user/user");
const PaymentInfo = require("../models/user/payment_info")
const ShipInfo = require("../models/user/ship_info")
const Guest = require("../models/guest/guest");
const Product = require("../models/Product");


const router = Router();

router.get("/", (req, res, next) => {
    User.find({}, (err, users) => {
        res.status(200).send(users)
    })
});

router.get("/all", (req, res, next) => {
    User.find({}, (err, users) => {
        PaymentInfo.populate(users, { path: "payment_info" }, (err, users) => {
            ShipInfo.populate(users, { path: "ship_info" }, (err, users) => {
                Product.populate(users, { path: "cart" }, (err, users) => {
                    res.status(200).send(users)
                })
            })
        })
    })
})

router.get("/guest", (req, res, next) => {
    Guest.find({}, (err, guests) => {
        res.status(200).send(guests)
    })
})

router.delete("/:email", (req, res, next) => {
    const { email } = req.params;
    User.findOneAndDelete(
        {email: email}
    )
    .then((result) => {
        res.status(200).send(`User with email: ${result.email} removed.`)
    })
})

module.exports = router;