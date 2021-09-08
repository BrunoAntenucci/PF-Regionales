const { Router } = require("express");
const Cart = require("../models/cart/cart");
const User = require("../models/user/user");

const router = Router();

router.get("/", async(req, res, next) => {
    //Traer car segun el usuario que esta en session
    //Es guest o user?
    const userSessionID = req?.session?.passport?.user
    if(userSessionID) {
        const user = await User.findOne({
            _id: userSessionID
        }).populate({
            path: "cart",
            populate: {
                path: "items",
                populate: {
                    path: "product"
                }
            }
        })
        if (typeof user.cart === "undefined") { //Si no tiene carrito
            const newCart = new Cart({});
            await newCart.save();
            user.cart = newCart;
            await user.save();
            //return res.status(200).send("Tu carrito esta vacio!")
        }
        res.status(200).send(user.cart)
    } else {
        return res.send("NO hay usuario logeado")
    }
});

router.post("/addProduct", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const idProduct = req.body.idProduct;
    const valueProduct = req.body.valueProduct;
    if(userSessionID) {
        const user = await User.findOne({
            _id: userSessionID
        }).populate("cart")
        
        //if (typeof user.cart === "undefined") {}
        const cart = await Cart.findOne({
            _id: user.cart._id
        }).populate({
            path: "items",
            populate: {
                path: "product"
            }
        })
        for (var i=0; i<cart.items.length; i++) {
            if (cart.items[i].product._id.toString() === idProduct) {
                cart.items[i].quantity++;
                cart.items[i].subTotal += valueProduct;
                cart.total += valueProduct;
                await cart.save();
                return res.status(200).send("Producto del Carrito Actualizado (+)");
            }
        }
        cart.items.push({
            product: idProduct,
            quantity: 1,
            subTotal: valueProduct
        });
        cart.total += valueProduct;
        await cart.save();
        return res.status(200).send("Producto añadido al Carrito")
    } else {
        return res.send("NO hay usuario logeado")
    }
})

router.delete("/removeProduct", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const idProduct = req.body.idProduct;
    const valueProduct = req.body.valueProduct;
    if(userSessionID) {
        const user = await User.findOne({
            _id: userSessionID
        }).populate("cart")
        
        const cart = await Cart.findOne({
            _id: user.cart._id
        }).populate({
            path: "items",
            populate: {
                path: "product"
            }
        })

        for (var i=0; i<cart.items.length; i++) {
            if (cart.items[i].product._id.toString() === idProduct) {
                if(cart.items[i].quantity > 0) cart.items[i].quantity--;
                if(cart.items[i].subTotal >= valueProduct) cart.items[i].subTotal -= valueProduct;
                if(cart.total >= valueProduct) cart.total -= valueProduct;
                await cart.save();
                return res.status(200).send("Producto del Carrito Actualizado (-)");
            }
        }
        return res.status(200).send("No hay Productos en tu Carrito.")
    } else {
        return res.send("NO hay usuario logeado")
    }
})

// router.post("/orderStatus", async(req, res, next) => {
//     const userSessionID = req?.session?.passport?.user;
//     const orderStatus = req.body.orderStatus || "Sin especificar";
//     if(userSessionID) {
//         const user = await User.findOne({
//             _id: userSessionID
//         }).populate("cart")
        
//         const cart = await Cart.findOne({
//             _id: user.cart._id
//         }).populate({
//             path: "items",
//             populate: {
//                 path: "product"
//             }
//         })

//         if (cart.order === "Sin accion") {
//             cart.order = "Creada"
//             await cart.save()
//             return res.status(200).send("Orden Creada! :)")
//         } else if (cart.order === "Creada" && orderStatus === "Sin especificar") {
//             cart.order = "Procesando"
//             await cart.save()
//             return res.status(200).send("Orden en proceso!")
//         } else if (cart.order === "Procesando" && orderStatus === "Cancelada") {
//             cart.order = orderStatus
//             await cart.save()
//             return res.status(200).send("Orden Cancelada! :(")
//         } if (cart.order === "Procesando" && orderStatus === "Completa") {
//             cart.order = orderStatus
//             await cart.save()
//             return res.status(200).send("Orden Completada! :D")
//         }

//     } else {
//         return res.send("NO hay usuario logeado")
//     }
// })

module.exports = router;