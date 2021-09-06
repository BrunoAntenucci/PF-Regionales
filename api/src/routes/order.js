const { Router } = require("express");
const User = require("../models/user/user");
const Cart = require("../models/cart/cart");
const Order = require("../models/order/order");
const mercadopago = require("mercadopago")

mercadopago.configure({
    access_token: "TEST-1891296065742759-090616-d7c769a2419eb510659222a3b9f06105-357533318"
})

const router = Router();

router.get("/", (req, res, next) => {
    Order.find({}).populate("cart")
        .then((allOrders) => {
            res.status(200).send(allOrders)
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).populate("cart")
        .then((order) => {
            res.status(200).send(order)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete("/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findByIdAndDelete(orderId)
        .then((order) => {
            res.status(200).send("Order eliminada!")
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/user/:userId", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate({
            path: "order",
            populate: {
                path: "cart",
                populate: {
                    path: "items",
                    populate: {
                        path: "product"
                    }
                }
            }
        });
        return res.status(200).send(user);
    }
    return res.status(200).send("No se encontro ese usuario");
})


router.post("/newOrder", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const cartID = req.body.cartId;

    const newOrder = new Order({})
    newOrder.cart = cartID
    await newOrder.save();

    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("order");
        user.order = [...user.order, newOrder._id]
        await user.save();
        return res.redirect(`/order/checkout/${newOrder._id.toString()}`)
    } else {
        return res.redirect(`/order/checkout/${newOrder._id.toString()}`)
    }
})

router.get("/checkout/:orderId", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const orderID = req.params.orderId;
    const order = await Order.findById(orderID).populate({
        path: "cart",
        populate: {
            path: "items",
            populate: {
                path: "product"
            }
        }
    })

    var payer = {}
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        payer = {
            name: user.first_name,
            email: user.email
        }
    }

    const itemsArray = order.cart.items.map((item) => {
        const obj = {
            title: item.product.name,
            description: item.product.description,
            unit_price: parseInt(item.product.price),
            quantity: item.quantity
        }
        return obj
    })
    console.log("ITEMARRAY: ", itemsArray)
    const preference = {
        items: itemsArray,
        back_urls: {
            success: `http://localhost:3001/order/mp/success/${orderID}`,
            failure: "http://localhost:3001/order/mp/failure",
            pending: "http://localhost:3001/order/mp/pending"
        },
        auto_return: "approved",
        payer: payer
    }

    mercadopago.preferences.create(preference)
        .then((response) => {
            global.id = response.body.id;
            res.send(response)
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/mp/success/:orderId", async(req, res, next) => {
    const {orderId} = req.params
    const {
        collection_id,
        collection_status,
        payment_id,
        status,
        payment_type,
        preference_id
    } = req.query
    const order = await Order.findByIdAndUpdate(orderId)
    if (status === "approved") {
        order.status = "Procesando"
        await order.save()
    }
    res.status(200).redirect("/")
})

router.get("/mp/failure", (req, res, next) => {
    res.send("El pago con mercado pago falló.")
})
router.get("/mp/pending", (req, res, next) => {
    res.send("El pago con mercado pago esta pendiente")
})

module.exports = router;