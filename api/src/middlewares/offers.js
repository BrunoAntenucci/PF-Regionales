const Product = require("../models/Product")
const Category = require("../models/Category")
module.exports = async function offers(req, res, next) {
    //------IDENTIFICAR DIA DE LA SEMANA------//
    const daysArray = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    const date = new Date();
    const dayName = daysArray[date.getDay()]

    const allProducts = await Product.find({}).populate("category")
    // allProducts.forEach(async(product) => {
    //     product.isInOffer = false;
    //     await product.save();
    // })
    const productsInOfferLUNES = []
    const productsInOfferMIERCOLES = []
    const productsInOfferVIERNES = []
    const allCategory = await Category.find({})

    if (dayName === "Lunes") { //15% OFF en Frutas y Verduras
        console.log(`[dayName=${dayName}] -> Hoy es Lunes! 15%OFF en Frutas y Verduras!`)
        const categoryID = allCategory.filter(category => category.name === "Frutas y Verduras")[0]._id.toString()

        //--Sacar de oferta a los demas productos--//
        const otherProducts = productsInOfferMIERCOLES.concat(productsInOfferVIERNES)
        if (otherProducts.length > 0) {
            otherProducts.forEach(async(product) => {
                product.isInOffer = false
                await product.save()
            })
        }

        for (var i=0; i<allProducts.length; i++) {
            for (var j=0; j<allProducts[i].category.length; j++) {
                if (allProducts[i].category[j]._id.toString() === categoryID) {
                    productsInOfferLUNES.push(allProducts[i])
                }
            }
        }
        if (productsInOfferLUNES.length > 0) {
            productsInOfferLUNES.forEach(async(product) => {
                product.priceOffer = (product.price * 0.85).toString();
                product.isInOffer = true;
                await product.save()
            })
            return next()
        } else {
            return next()
        }
        
    } else if (dayName === "Miercoles") { //15% OFF en Carnes
        console.log(`[dayName=${dayName}] -> Hoy es Miercoles! 15%OFF en Carnes!`);
        const categoryID = allCategory.filter(category => category.name === "Carnes")[0]._id.toString()

        //--Sacar de oferta a los demas productos--//
        const otherProducts = productsInOfferLUNES.concat(productsInOfferVIERNES)
        if (otherProducts.length > 0) {
            otherProducts.forEach(async(product) => {
                product.isInOffer = false
                await product.save()
            })
        }
        
        for (var i=0; i<allProducts.length; i++) {
            for (var j=0; j<allProducts[i].category.length; j++) {
                if (allProducts[i].category[j]._id.toString() === categoryID) {
                    productsInOfferMIERCOLES.push(allProducts[i])
                }
            }
        }
        if (productsInOfferMIERCOLES.length > 0) {
            productsInOfferMIERCOLES.forEach(async(product) => {
                product.priceOffer = (product.price * 0.85).toString();
                product.isInOffer = true;
                await product.save()
            })
            return next()
        } else {
            return next()
        }
        
    } else if (dayName === "Viernes") { //15% OFF en Bebidas
        console.log(`[dayName=${dayName}] -> Hoy es Viernes! 15%OFF en Bebidas!`)
        const categoryID = allCategory.filter(category => category.name === "Bebidas")[0]._id.toString()
        
        //--Sacar de oferta a los demas productos--//
        const otherProducts = productsInOfferLUNES.concat(productsInOfferMIERCOLES)
        if (otherProducts.length > 0) {
            otherProducts.forEach(async(product) => {
                product.isInOffer = false
                await product.save()
            })
        }
        for (var i=0; i<allProducts.length; i++) {
            for (var j=0; j<allProducts[i].category.length; j++) {
                if (allProducts[i].category[j]._id.toString() === categoryID) {
                    productsInOfferVIERNES.push(allProducts[i])
                }
            }
        }
        if(productsInOfferVIERNES.length > 0) {
            productsInOfferVIERNES.forEach(async(product) => {
                product.priceInOffer = (product.price * 0.85).toString();
                product.isInOffer = true;
                await product.save()
            })
            return next();
        } else {
            return next();
        }
    } else {
        return next()
    }
    
}