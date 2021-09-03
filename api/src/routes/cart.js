const { Router } = require("express");
const Guest = require("../models/guest/guest");
const Product = require("../models/Product");
const User = require("../models/user/user");

const router = Router();

router.get("/", (req, res, next) => {
    if (req?.session?.passport?.user) {
        User.findOne({
            _id: req?.session?.passport?.user
        }, (err, userCart) => {
            Product.populate(userCart, { path: "cart" }, (err, userCart) => {
                res.status(200).send(userCart)
            })
        })
    } else {
        Guest.findOne({
            _id: req?.sessionID
        }, (err, userCart) => {
            Product.populate(userCart, { path: "cart" }, (err, userCart) => {
                res.status(200).send(userCart)
            })
        })
    }
});

router.post("/:idProduct", async (req, res, next) => {
    const { idProduct } = req.params
    if (req?.session?.passport?.user) {
        User.findOneAndUpdate(
            {_id: req?.session?.passport?.user},
            {$addToSet: {cart: idProduct}},
            {new: true}
        )
        .then((result) => {
            return res.send("Item added to cart!")
        })
        .catch((err) => {
            return next(err)
        })
    } else {
        const guest = await Guest.findById(req.sessionID);
        if(!guest) {
            const newGuest = new Guest({});
            newGuest._id = req.sessionID;
            newGuest.cart = [...newGuest.cart, idProduct]
            await newGuest.save();
        } else {
            guest.cart = [...guest.cart, idProduct]
            await guest.save();
        }
        return res.send("Usuario guest")
    }
});

router.post("/remove/:idProduct", (req, res, next) => {
    const { idProduct } = req.params;
    if (req?.session?.passport?.user) {
        User.findOneAndUpdate(
            {_id: req?.session?.passport?.user},
            {$pull: { cart: idProduct}}
        )
    } else {
        Guest.findOneAndUpdate(
            {_id: req.sessionID},
            {$pull: { cart: idProduct}}
        )
    }
})

module.exports = router;