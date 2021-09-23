const User = require("../models/user/user")
const Product = require("../models/Product")

module.exports = async function adminCheck(req, req, next) {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID)
        if (user) {
            if (user.roles.role === "Admin") {
                return next()
            } else {
                return res.status(101).send("[Acceso Denegado]: Requiere permisos de Admin.")
            }
        }
    } else {
        return res.status(101).send("[Acceso Denegado]: No hay usuario logueado.")
    }
}
//--ESTA EN LA CARPETA MIDDLEWARE/OFFERS--//
module.exports = async function offers(req, res, next) {
    //------IDENTIFICAR DIA DE LA SEMANA------//
    const daysArray = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    const date = new Date();
    const dayName = daysArray[date.getDay()]
    

    const allProducts = await Product.find({}).populate("category")
    allProducts.forEach(async(product) => {
        product.isInOffer = false;
        await product.save();
    })

    if (dayName === "Domingo") { //15% OFF en Vinos
        const productsInOffer = allProducts.filter(product => product.category.includes("Vinos"))
        console.log(`[dayName=${dayName}] -> Hoy es Domingo! 15%OFF en Vinos!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next();
        })
    } else if (dayName === "Lunes") { //15% OFF en Frutas y Verduras
        const productsInOffer = allProducts.filter(product => product.category.includes("Frutas y Verduras"))
        console.log(`[dayName=${dayName}] -> Hoy es Lunes! 15%OFF en Frutas y Verduras!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next()
        })
        
    } else if (dayName === "Martes") { //15% OFF en ALMACEN
        const productsInOffer = allProducts.filter(product => product.category.includes("Almacen"))
        console.log(`[dayName=${dayName}] -> Hoy es Martes! 15%OFF en almacen!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next()
        })
        
    } else if (dayName === "Miercoles") { //15% OFF en Carnes
        const productsInOffer = allProducts.filter(product => product.category.includes("Carnes"))
        console.log(`[dayName=${dayName}] -> Hoy es Miercoles! 15%OFF en Carnes!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next()
        })
        
    } else if (dayName === "Jueves") { //15% OFF en Indumentaria
        const productsInOffer = allProducts.filter(product => product.category.includes("Indumentaria"))
        console.log(`[dayName=${dayName}] -> Hoy es Jueves! 15%OFF en Indumentaria!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next();
        })
        
    } else if (dayName === "Viernes") { //15% OFF en Bebidas
        const productsInOffer = allProducts.filter(product => product.category.includes("Bebidas"))
        console.log(`[dayName=${dayName}] -> Hoy es Viernes! 15%OFF en Bebidas!`)
        productsInOffer.forEach(async(product) => {
            product.priceOffer = (product.price * 0.85).toString();
            product.isInOffer = true;
            await product.save()
            return next();
        })
    } else {
        return next()
    }
    
}