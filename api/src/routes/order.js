const { Router } = require("express");
const User = require("../models/user/user");
const Cart = require("../models/cart/cart");
const Order = require("../models/order/order");
const ShipInfo = require("../models/user/ship_info");
const mercadopago = require("mercadopago");

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

router.get("/find/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).populate("cart")
        .then((order) => {
            res.status(200).send(order)
        })
        .catch((err) => {
            next(err)
        })
})

router.delete("/remove/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findByIdAndDelete(orderId)
        .then((order) => {
            res.status(200).send("Order eliminada!")
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/currentUser", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        .populate({
            path: "order",
            populate: {
                path: ["cart", "ship_info"],
                populate: {
                    path: "items",
                    populate: {
                        path: "product"
                    }
                }
            }
        })
        return res.status(200).send(user);
    }
    return res.status(200).send("No se encontro ese usuario");
})



//------------------ORDER STATUS RUTES------------------//
router.post("/complete/:orderId", async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (order) {
        order.status = "Completa";
        await order.save();
        return res.status(200).send("Orden completa! :)")
    } else {
        return res.send("No se encontro esa orden")
    }
})
router.post("/cancel/:orderId", async(req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (order) {
        order.status = "Cancelada";
        await order.save();
        return res.status(200).send("Orden cancelada! :(")
    } else {
        return res.send("No se encontro esa orden")
    }
})

//------------------MERCADO PAGO RUTES------------------//
router.post("/newOrder", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const { 
        cartId,
        shipInfoId,
        country,
        city,
        postal_code,
        address_name,
        address_number
    } = req.body;

    const shipInfo = await ShipInfo.findById(shipInfoId);
    const newOrder = new Order({})
    newOrder.cart = cartId
    
    if(shipInfo) {
        newOrder.ship_info = shipInfoId
    } else {
        const newShipInfo = new ShipInfo({})
        newShipInfo.country = country;
        newShipInfo.city = city;
        newShipInfo.postal_code = postal_code;
        newShipInfo.address_name = address_name;
        newShipInfo.address_number = address_number;
        newOrder.shipInfo = newShipInfo._id;
        await newShipInfo.save();
    }
    
    await newOrder.save();

    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("order");
        user.order = [...user.order, newOrder._id]
        await user.save();
        return res.redirect(`http://localhost:3001/order/checkout/${newOrder._id.toString()}`)
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
                path: "product",
                populate: {
                    path: "category"
                }
            }
        }
    }).populate("ship_info")

    var shipInfo = {
        zip_code: order.ship_info.postal_code.toString(),
        street_name: order.ship_info.address_name,
        street_number: order.ship_info.address_number
    } 

    var payer = {}
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        payer = {
            name: user.first_name,
            surname: user.last_name,
            email: user.email,
            address: shipInfo,
        }
    }

    const itemsArray = order.cart.items.map((item) => {
        const obj = {
            id: item.product._id.toString(),
            title: item.product.name,
            currency_id: "ARS",
            picture_url: item.product.image,
            description: item.product.description,
            category_id: item.product.category[0].name,
            quantity: item.quantity,
            unit_price: parseInt(item.product.price),
        }
        return obj
    })
    const preference = {
        items: itemsArray,
        payer: payer,
        back_urls: {
            success: `http://localhost:3001/order/mp/success/${orderID}`,
            failure: "http://localhost:3001/order/mp/failure",
            pending: "http://localhost:3001/order/mp/pending"
        },
        auto_return: "approved",
        statement_descriptor: "PF_REGIONALES"
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
    res.status(200).send("Pago completado! Orden en proceso.");
})

router.get("/mp/failure", (req, res, next) => {
    res.send("El pago con mercadopago falló.")
})
router.get("/mp/pending", (req, res, next) => {
    res.send("El pago con mercadopago esta pendiente")
})

module.exports = router;