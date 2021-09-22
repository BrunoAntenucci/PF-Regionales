const { Router } = require("express");
const User = require("../models/user/user");
const Petition = require("../models/petition/Petition");
const Product = require("../models/Product");
const Store = require("../models/store/store");
const Category = require("../models/Category")
const router = Router();

router.get("/all", async (req, res, next) => {
    const petitions = await Petition.find({})
    res.status(200).send(petitions);
})

router.get("/byUser", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("petitions")
        return res.status(200).send(user.petitions)
    } else {
        return res.send("No hay usuario logeado.")
    }
})

router.get("/byId", async (req, res, next) => {
    const petitionId = req.body.petitionId
    const petition = await Petition.findById(petitionId)
        .populate("user");
    if (petition) {
        return res.status(200).send(petition)
    } else {
        return res.send(`No se encontro peticion con id=${petitionId}`)
    }
})

router.post("/petitionAccepted", async (req, res, next) => {
    const petitionId = req.body.petitionId;
    const petition = await Petition.findById(petitionId)
    .populate("dataProduct")
    .populate("dataStore")
    //.populate("user");
    const userPetition = await User.findById(petition.user).populate("storesOwn").populate("productsOwn")
    //--Cambiar estado a Aceptada--//
    if (petition.status === "Aceptada") {
        return res.send(`Esta peticion ya fue aceptada.`)
    }
    petition.status = "Aceptada"
    await petition.save();
    //---Crear nuevo producto o tienda segun corresponda---//
    if (petition.about === "PRODUCT") {
        console.log(`DATAPRODUCT ${petition.dataProduct}`)
        const newProduct = await new Product({})
        newProduct.user = petition.user;
        newProduct.name = petition.dataProduct.name;
        newProduct.description = petition.dataProduct.description;
        newProduct.price = petition.dataProduct.price;
        newProduct.category = petition.dataProduct.category;
        newProduct.image = petition.dataProduct.image;
        newProduct.quantity = petition.dataProduct.quantity;
        await newProduct.save()
            .then((result) => {
                console.log("Producto nuevo creado!")
            })
            .catch((err) => {
                next(err)
            })
        userPetition.productsOwn = [...userPetition.productsOwn, newProduct._id]
        userPetition.role = "Admin"
        userPetition.save()
            .then((result) => {
                console.log("Producto agregado al usuario y se actualizo su role a Admin!")
            })
            .catch((err) => {
                next(err)
            })
    }
    if (petition.about === "STORE") {
        console.log(`DATASTORE ${petition.dataStore}`)
        const newStore = await new Store({})
        newStore.name = petition.dataStore.name;
        newStore.description = petition.dataStore.description;
        newStore.city = petition.dataStore.city;
        newStore.address = petition.dataStore.address;
        newStore.products = petition.dataStore.products;
        newStore.img = petition.dataStore.img;
        newStore.owner = petition.user;
        await newStore.save()
            .then((result) => {
                console.log("Tienda nueva creada!")
            })
            .catch((err) => {
                next(err)
            })
        userPetition.storesOwn = [...userPetition.storesOwn, newStore._id]
        userPetition.role = "Admin"
        userPetition.save()
            .then((result) => {
                console.log("Store agregado al usuario y se actualizo su role a Admin!")
            })
            .catch((err) => {
                next(err)
            })
    }
    if (petition.about === "CATEGORY") {
        console.log(`DATACATEGORY ${petition.dataCategory}`)
        const newCategory = new Category({})
        newCategory.name = petition.dataCategory.name
        await newCategory.save()
            .then((result) => {
                console.log("Nueva categoria creada!")
            })
            .catch((err) => {
                next(err)
            })
    }
    return res.status(200).send(`Peticion de ${petition.about} con id=${petitionId} aceptada!`)
})

router.post("/petitionDenied", async (req, res, next) => {
    const petitionId = req.body.petitionId;
    const petition = await Petition.findById(petitionId)
    .populate("dataProduct")
    .populate("dataStore")
    //.populate("user");
    //--Cambiar estado a Rechazada--//
    petition.status = "Rechazada"
    await petition.save();
    res.status(200).send(`La peticion con id=${petitionId} fue rechazada.`)
})

router.delete("/delete/:petitionId", async (req, res, next) => {
    const petitionId = req.params.petitionId;
    const petition = await Petition.findById(petitionId);
    if (petition) {
        //---Eliminar la peticion de la lista de peticiones del usuario--//
        const user = await User.findById(petition.user)
        if (user) {
            await user.petitions.filter(pet => pet._id !== petition._id)
            await user.save()
            console.log(`Peticion eliminada de las peticiones del usuario ${user.email}`)
        } else {
            return res.send(`El usuario con id=${petition.user.toString()} no existe.`)
        }  
    } else {
        return res.send(`La peticion con id=${petitionId} no existe.`)
    }

    Petition.findByIdAndDelete(petitionId)
        .then((result) => {
            console.log(`Resultado eliminar peticion: ${result}`)
            return res.status(200).send(`Peticion con id=${petitionId} eliminada!`)
        })
        .catch((err) => {
            next(err)
        })
})

router.post("/newPetition/product", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const { dataProduct } = req.body;
    console.log("dataProduct", dataProduct)
    if (userSessionID) {
        const user = await User.findById(userSessionID);
        const newPetition = new Petition({});
        newPetition.about = "PRODUCT";
        newPetition.dataProduct = dataProduct;
        newPetition.user = userSessionID;
        user.petitions.push(newPetition._id);
        await newPetition.save()
        console.log("Se creó la nueva peticion de Producto");
        await user.save();
        console.log(`La nueva peticion de Producto (${newPetition._id}) fue añadida a las peticiones del usuario ${user.email}`)
        return res.status(200).send("Peticion para crear Producto enviada!")
    } else {
        return res.send("Debes loguearte primero para enviar una peticion.")
    }
})

router.post("/newPetition/store", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const { dataStore } = req.body;
    console.log("DATASTORE", dataStore)
    if (userSessionID) {
        const user = await User.findById(userSessionID);
        const newPetition = new Petition({});
        newPetition.about = "STORE";
        newPetition.dataStore = dataStore;
        newPetition.user = userSessionID;
        user.petitions.push(newPetition._id)
        await newPetition.save();
        console.log("Se creó la nueva peticion de Tienda");
        await user.save();
        console.log(`La nueva peticion de Tienda (${newPetition._id}) fue añadida a las peticiones del usuario ${user.email}`)
        return res.status(200).send("Peticion para crear Tienda enviada!")
    } else {
        return res.send("Debes loguearte primero para enviar una peticion.")
    }
})

router.post("/newPetition/category", async (req, res, next) => {
    const userSessionID = req?.session?.passport?.user
    const { dataCategory } = req.body;
    console.log("CATEGORYNAME", dataCategory)
    if (userSessionID) {
        const user = await User.findById(userSessionID);
        const newPetition = new Petition({});
        newPetition.about = "CATEGORY";
        newPetition.dataCategory = dataCategory;
        newPetition.user = userSessionID;
        user.petitions.push(newPetition._id)
        await newPetition.save();
        console.log("Se creó la nueva peticion de Categoria");
        await user.save();
        console.log(`La nueva peticion de Categoria (${newPetition._id}) fue añadida a las peticiones del usuario ${user.email}`)
        return res.status(200).send("Peticion para crear Categoria enviada!")
    } else {
        return res.send("Debes loguearte primero para enviar una peticion.")
    }
})

router.get("/asVendor", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("petitionsAsVendor");
        return res.status(200).send(user.petitionsAsVendor)
    } else {
        return res.send("No hay usuario logueado.")
    }
})

router.post("/asVendor/filter", async(req, res, next) => {
    const userSessionID = req?.session?.passport?.user;
    const { status } = req.body;
    console.log(`Filtrar ordenes por status=${status}`)
    if (userSessionID) {
        const user = await User.findById(userSessionID).populate("petitionsAsVendor")
        const byStatus = []
        for (var i=0; i<user.petitionsAsVendor.length; i++) {
            if (user.petitionsAsVendor[i].status === status) {
                byStatus.push(user.petitionsAsVendor[i])
            }
        }
        return res.status(200).send(byStatus)
    } else {
        return res.send("No hay usuario logueado.")
    }
})

module.exports = router;