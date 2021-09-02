const { Router } = require("express");
const User = require("../models/user/user");
const PaymentInfo = require("../models/user/payment_info")
const ShipInfo = require("../models/user/ship_info")

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
                res.status(200).send(users)
            })
        })
    })
})

module.exports = router;