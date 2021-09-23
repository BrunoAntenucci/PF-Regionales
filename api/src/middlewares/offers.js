const Product = require("../models/Product")
//const Category = require("../models/Category")
module.exports = async function offers(req, res, next) {
    //------IDENTIFICAR DIA DE LA SEMANA------//
    const daysArray = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    const date = new Date();
    const dayName = daysArray[date.getDay()]

    const allProducts = await Product.find({}).populate("category")
    //const allCategory = await Category.find({})


    if (dayName === "Lunes") { //15% OFF en Frutas y Verduras
        console.log(`[dayName=${dayName}] -> Hoy es Lunes! 15%OFF en Frutas y Verduras!`)
        //const categoryID = allCategory.filter(category => category.name === "Frutas y Verduras")[0]._id.toString()
        allProducts.forEach(async (product) => {
            for (var i=0; i<product.category.length; i++) {
                if (product.isInOffer === false && product.category[i].name === "Frutas y Verduras") {
                    product.priceInOffer = (product.price * 0.85).toString();
                    product.isInOffer = true;
                    await product.save()
                    console.log(`Producto ${product.name} puesto en oferta`)
                } else if (product.isInOffer === true && product.category[i].name !== "Frutas y Verduras") {
                    product.isInOffer = false;
                    await product.save();
                    console.log(`Producto ${product.name} sacado de oferta`)
                }
            }
        })
        return next();
    } else if (dayName === "Miercoles") { //15% OFF en Carnes
        console.log(`[dayName=${dayName}] -> Hoy es Miercoles! 15%OFF en Carnes!`);
        //const categoryID = allCategory.filter(category => category.name === "Carnes")[0]._id.toString()
        allProducts.forEach(async (product) => {
            for (var i=0; i<product.category.length; i++) {
                if (product.isInOffer === false && product.category[i].name === "Carnes") {
                    product.priceInOffer = (product.price * 0.85).toString();
                    product.isInOffer = true;
                    await product.save()
                    console.log(`Producto ${product.name} puesto en oferta`)
                } else if (product.isInOffer === true && product.category[i].name !== "Carnes") {
                    product.isInOffer = false;
                    await product.save();
                    console.log(`Producto ${product.name} sacado de oferta`)
                }
            }
        })
        return next();
    } else if (dayName === "Viernes") { //15% OFF en Bebidas
        console.log(`[dayName=${dayName}] -> Hoy es Viernes! 15%OFF en Bebidas!`)
        //const categoryID = allCategory.filter(category => category.name === "Bebidas")[0]._id.toString()
        allProducts.forEach(async (product) => {
            for (var i=0; i<product.category.length; i++) {
                if (product.isInOffer === false && product.category[i].name === "Bebidas") {
                    product.priceInOffer = (product.price * 0.85).toString();
                    product.isInOffer = true;
                    await product.save()
                    console.log(`Producto ${product.name} puesto en oferta`)
                } else if (product.isInOffer === true && product.category[i].name !== "Bebidas") {
                    product.isInOffer = false;
                    await product.save();
                    console.log(`Producto ${product.name} sacado de oferta`)
                }
            }
        })
        return next();
    } else {
        allProducts.forEach(async (product) => {
            if (product.isInOffer === true) {
                product.isInOffer = false;
                await product.save()
                console.log(`Producto ${product.name} sacado de oferta`)
            }
        })
        console.log("Todos los productos fueron sacados de ofertas")
        return next()
    }
    
}