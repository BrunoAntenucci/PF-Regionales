const { Router } = require("express");
const User = require("../models/user/user");
const Product = require("../models/Product")
const Order = require("../models/order/order");
const ShipInfo = require("../models/user/ship_info");
const Cart = require("../models/cart/cart");
const mercadopago = require("mercadopago");
const nodemailer = require("nodemailer");

mercadopago.configure({
    access_token: "TEST-1891296065742759-090616-d7c769a2419eb510659222a3b9f06105-357533318"
})

const router = Router();
//---------------VER TODAS LAS ORDENES---------------//
router.get("/", (req, res, next) => {
    Order.find({}).populate("items").populate("ship_info").populate("owner")
        .then((allOrders) => {
            res.status(200).send(allOrders)
        })
        .catch((err) => {
            next(err)
        })
})
//---------------ENCONTRAR UNA ORDER POR ID---------------//
router.get("/find/:orderId", (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).populate("items").populate("ship_info").populate("owner")
        .then((order) => {
            res.status(200).send(order)
        })
        .catch((err) => {
            next(err)
        })
})
//---------------ELIMINAR UNA ORDER POR ID---------------//
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
//------------ORDER POR SEGUN USUARIO LOGUEADO------------//
router.get("/currentUser", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        .populate({
            path: "order",
            populate: {
                path: "items",
                populate: {
                    path: "product"
                }
            }
        }).populate("ship_info")
        return res.status(200).send(user.order);
    }
    return res.status(200).send("No se encontro ese usuario");
})

//---------------FILTRAR ORDERS DE UN USER POR ESTADO---------------//
router.post("/orderByStatus", async (req, res, next) => {
    //--Es por usuario o todas?
    const userSessionID = req?.session?.passport?.user;
    const { orderStatus } = req.body;
    console.log(`Filtrar ordenes por estado= ${orderStatus}`)
    if (userSessionID) {
        console.log("Filtrar ordenes del usuario en sesion.")
        const user = await User.findById(userSessionID).populate({
            path: "order",
            populate: {
                path: "items",
                populate: {
                    path: "product"
                }
            }
        })
        const ordersByStatus = await user.order.filter(order => order.status === orderStatus)
        console.log('orderByStatus',ordersByStatus);
        return res.status(200).send(ordersByStatus)
    } else {
        return res.send("No hay usuario logueado")
        // console.log("Filtrar dentro de todas las ordenes")
        // const orders = await Order.find({})
        // const ordersByStatus = orders.filter(order => order.status === orderStatus)
        // return res.status(200).send(ordersByStatus)
    }
})
//------------------FILTRAR TODAS LAS ORDERS POR ESTADO---------------------//
router.post("/allOrdersByStatus", async (req, res, next) => {
    const { orderStatus } = req.body;
    const orders = await Order.find({})
    const ordersByStatus = orders.filter(order => order.status === orderStatus)
    return res.status(200).send(ordersByStatus)
})
//------------------ORDENES PREVIAS---------------------//
router.get("/prevOrders", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("order")
        const prevOrders = user.order.filter(order => order.status === "Cancelada" || order.status === "Completa")
        return res.status(200).send(prevOrders)
    } else {
        return res.send("Deberia ser un usuario logueado.")
    }
})
//------------------ORDER STATUS RUTES------------------//
//------------------ACEPTAR UNA ORDER------------------//
router.post("/complete/:orderId", async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate("owner");
    if (order) {
        order.status = "Completa";
        await order.save();
        //---------MAIL DE CONFIRMACION---------//
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: "apikey",
                pass: "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"
            }
        });
        var mailOptions = {
            from: "alumnohenry09@gmail.com",
            to: order.owner.email,
            subject: "PF-Regionales Order Confirmed",
            text: 'You are receiving this because your order has been shipped!\n\n' +
            'The vendor should contact you with the shipments details.\n\n' +
            'Thank you for your trust in PF-Regionales!\n'
        };
        smtpTransport.sendMail(mailOptions, (err) => {
            done(err, 'done');
        });
        return res.status(200).send("Orden completa! :)")
    } else {
        return res.send("No se encontro esa orden")
    }
})
//---------------CANCELAR UNA ORDER---------------//
router.post("/cancel/:orderId", async(req, res, next) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate("items").populate("owner");
    if (order) {
        order.status = "Cancelada";
        await order.save();
        //---------DEVOLVER STOCK DEL PRODUCTO---------//
        const orderItems = order.items;
        for (var i=0; i<orderItems.length; i++) {
            const product = await Product.findById(orderItems[i].product._id)
            product.quantity = product.quantity + orderItems[i].quantity;
            product.quantity = product.quantity >= 0 ? product.quantity : 0;
            console.log(`Stock de ${product.name} actualizado (se le sumó la cantidad que habia sido restada)`)
            await product.save()
        }
        //---------MAIL DE CONFIRMACION---------//
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: "apikey",
                pass: "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"
            }
        });
        var mailOptions = {
            from: "alumnohenry09@gmail.com",
            to: order.owner.email,
            subject: "PF-Regionales Order Confirmed",
            text: 'You are receiving this because your order has been canceled :(\n\n' +
            'If you think this is an error, please contact to the vendor.\n\n' +
            'You also can contact with us at: pf-regionales@gmail.com\n\n' +
            'Thank you for your trust in PF-Regionales!\n'
        };
        smtpTransport.sendMail(mailOptions, (err) => {
            done(err, 'done');
        });
        return res.status(200).send("Orden cancelada! :(")
    } else {
        return res.send("No se encontro esa orden")
    }
})

//------------------MERCADO PAGO RUTES------------------//
//------------------NUEVA ORDER-------------------------//
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

    console.log("REQ BODY: ", req.body)

    const cart = await Cart.findById(cartId).populate({
        path: "items",
        populate: {
            path: "product",
            populate: {
                path: "user"
            }
        }
    })
    console.log("CART: ", cart)

    const shipInfo = await ShipInfo.findById(shipInfoId);
    const newOrder = new Order({})
    newOrder.items = cart.items
    newOrder.total = cart.total
    await newOrder.save();

    //---------ENVIAR ORDENES A LOS VENDEDORES---------//
    var itemsOwners = []
    cart.items.forEach((product) => {
        if(!itemsOwners.includes(product.product.user)) {
            itemsOwners.push(product.product.user)
        }
    })
    itemsOwners.forEach(async(owners) => {
        const productOwner = await User.findById(owners);
        productOwner.petitionsAsVendor = [...productOwner.petitionsAsVendor, newOrder._id]
        await productOwner.save()
        console.log(`Se agrego la peticion al usuario vendedor`)
    })
    // cart.items.forEach(async(product) => {
    //     const productOwner = await User.findById(product.product.user);
    //     productOwner.petitionsAsVendor = [...productOwner.petitionsAsVendor, newOrder._id]
    //     await productOwner.save()
    //     console.log(`Se agrego la peticion al usuario vendedor`)
    // })
    
    //---------LIMPIAR CARRITO DEL USER------//
    cart.items = [];
    cart.total = 0;
    await cart.save()
        .then((result) => {
            console.log("Carrito Limpiado")
        })
        .catch((err) => {
            console.log("ERROR AL LIMPIAR EL CARRITO")
            console.log(err)
        })
    
    console.log("SHIP_INFO: ", shipInfo)

    if(shipInfo) {
        console.log("Ya tiene shipInfo, agregandola a la order:")
        newOrder.ship_info = shipInfoId
        await newOrder.save();
    } else {
        console.log("No tenia shipInfo, creandola")
        const newShipInfo = new ShipInfo({})
        newShipInfo.country = country;
        newShipInfo.city = city;
        newShipInfo.postal_code = postal_code;
        newShipInfo.address_name = address_name;
        newShipInfo.address_number = address_number;
        newOrder.ship_info = newShipInfo._id;
        await newShipInfo.save();
        await newOrder.save();
        console.log("ShipInfo creada: ", newShipInfo._id)
    }

    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("order");
        user.order = [...user.order, newOrder._id]
        newOrder.owner = user._id
        await user.save();
        await newOrder.save();
        return res.redirect(`http://localhost:3001/order/checkout/${newOrder._id.toString()}`)
    } else {
        return res.redirect(`Debes estar logueado para poder realizar una nueva orden.`)
    }
})

router.get("/checkout/:orderId", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const orderID = req.params.orderId;
    const order = await Order.findById(orderID).populate({
            path: "items",
            populate: {
                path: "product",
                populate: {
                    path: "category"
                }
            }
    }).populate("ship_info")

    console.log("ORDER:", order)

    var shipInfo = {
        zip_code: order.ship_info.postal_code.toString(),
        street_name: order.ship_info.address_name,
        street_number: order.ship_info.address_number
    }
    var receiver_address = {
        zip_code: order.ship_info.postal_code.toString(),
        street_name: order.ship_info.address_name,
        city_name: order.ship_info.city,
        state_name: order.ship_info.country,
        street_number: order.ship_info.address_number,
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

    const itemsArray = order.items.map((item) => {
        const obj = {
            id: item.product._id.toString(),
            title: item.product?.name,
            currency_id: "ARS",
            picture_url: item.product.image,
            description: item.product.description,
            category_id: item.product.category[0]?.name,
            quantity: item.quantity,
            unit_price: parseInt(item.product.price),
        }
        return obj
    })
    const preference = {
        items: itemsArray,
        payer: payer,
        back_urls: {
            success: `http://localhost:3000/products`,
            failure: "http://localhost:3000/order/failure",
            pending: "http://localhost:3000/order/pending"
        },
        shipments: {
            receiver_address: receiver_address
        },
        external_reference: order._id.toString(),
        auto_return: "approved",
        statement_descriptor: "PF_REGIONALES"
    }

    mercadopago.preferences.create(preference)
        .then(async(response) => {
            global.id = response.body.id;
            const order = await Order.findById(orderID).populate("items")
            console.log("ORDER:", order)
            if (response.body.auto_return === "approved") {
                order.status = "Procesando"
                await order.save()
                //---------RESTAR STOCK DEL PRODUCTO---------//
                const orderItems = order.items;
                console.log("orderItems: ", orderItems)
                for (var i=0; i<orderItems.length; i++) {
                    const product = await Product.findById(orderItems[i].product._id)
                    product.quantity = product.quantity - orderItems[i].quantity;
                    product.quantity = product.quantity >= 0 ? product.quantity : 0;
                    console.log(`Stock de ${product.name} actualizado (se le resto la cantidad comprada)`)
                    await product.save()
                }
                //---------MAIL DE CONFIRMACION---------//
                var smtpTransport = nodemailer.createTransport({
                    host: "smtp.sendgrid.net",
                    port: 465,
                    auth: {
                        user: "apikey",
                        pass: "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"
                    }
                });
                var mailOptions = {
                    from: "alumnohenry09@gmail.com",
                    to: response.body.payer.email,
                    subject: "PF-Regionales Order Confirmed",
                    text: 'You are receiving this because your payment was accepted and the order is now processing.\n\n' +
                    'The vendor now will prepare your order for shipment.\n\n' +
                    'You will be notified when the order is shipped.\n\n' +
                    'Thank you for your trust in PF-Regionales!\n'
                };
                smtpTransport.sendMail(mailOptions, (err) => {
                    done(err, 'done');
                });
            }
            res.json(response)
        })
        .catch((err) => {
            console.log("ERROR CON preferences")
            console.log(err)
            next(err)
        })
})
//---------POR AHORA NO SE USAN---------//
router.get("/mp/failure", (req, res, next) => {
    res.send("El pago con mercadopago falló.")
})
router.get("/mp/pending", (req, res, next) => {
    res.send("El pago con mercadopago esta pendiente")
})

module.exports = router;