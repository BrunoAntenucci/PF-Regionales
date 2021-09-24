const { Router } = require('express');
const router = Router();
const Store = require('../models/store/store.js');
const User = require("../models/user/user");

router.post("/", async (req, res) => {
    const {name, description, city, products, address, reputation} = req.body; 
    console.log(req.body)
    if (!name || !description || !city  || !products || !address || !reputation) {
        return res.status(400).json({
            error: 'Something is missing!',
        });
    } 
    const newStore = await new Store({name, description, city, products , address, reputation})
    const store = await newStore.save();
    res.json(store);
});

router.get('/all', async (req, res) => {
    try{
        const name = req.query.name;
        if(name) {
            let store = await Store.findOne( { name: name } )
            res.status(200).send(store);
            return store            
        }
        const stores = await Store.find({});
        res.status(200).send(stores);
    } catch(error){
        res.status(500).send(error)
    }
})
router.get("/actives", async(req, res, next) => {
    const storesActives = await Store.find({isActive: true})
    return res.status(200).send(storesActives);
})
router.get("/inactives", async(req, res, next) => {
    const storesInactives = await Store.find({isActive: false})
    return res.status(200).send(storesInactives)
})

router.get('/:id', async (req, res) => {
    try{
        const store = await Store.findById(req.params.id);
        console.log(store)
        if(!store) {
            return res.status(404); 
        }
        res.status(200).send(store)
    } catch(error){
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req, res) => {
    const userSessionID = req?.session?.passport?.user
    try{
        const storeCheck = await Store.findById(req.params.id)
        if (storeCheck.owner.toString() === userSessionID) {
            console.log(`El usuario con id= ${userSessionID} es el dueño de la Store.`)
            const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).send(`Store ${store.name} actualizada con exito!`)
        } else {
            console.log(`El usuario con id= ${userSessionID} NO es el dueño de la Store.`)
            return res.send(`La store ${store.name} no es suya y no podra editarla.`)
        }
    } catch(error) {
        return res.status(500).send(error)
    }
}) 

router.delete('/:id', async(req, res) => {
    const userSessionID = req?.session?.passport?.user
    try {
        const storeCheck = await Store.findById(req.params.id)
        const user = await User.findById(userSessionID)
        if (user.role === "SuperAdmin" || storeCheck.owner.toString() === userSessionID) {
            console.log(`El usuario ${user.name} es SuperAdmin o es el dueño de la Store.`)
            const store = await Store.findById(req.params.id)
            store.isActive = false; 
            await store.save()
            return res.status(200).send(`Store ${store.name} fue puesta inactiva con exito!`)
        } else {
            console.log(`El usuario con id= ${userSessionID} NO es el dueño de la Store ni SuperAdmin.`)
            return res.send(`La store ${store.name} no es suya y no podra ponerla como inactiva.`)
        }
    } catch(error) {
        return res.status(500).send(error)
    }
})
router.post('/revive/:id', async(req, res) => {
    const userSessionID = req?.session?.passport?.user
    try {
        const storeCheck = await Store.findById(req.params.id)
        const user = await User.findById(userSessionID)
        if (user.role === "SuperAdmin" || storeCheck.owner.toString() === userSessionID) {
            console.log(`El usuario ${user.name} es SuperAdmin o es el dueño de la Store.`)
            const store = await Store.findById(req.params.id)
            store.isActive = true; 
            await store.save()
            return res.status(200).send(`Store ${store.name} fue revivida con exito!`)
        } else {
            console.log(`El usuario con id= ${userSessionID} NO es el dueño de la Store ni SuperAdmin.`)
            return res.send(`La store ${store.name} no es suya y no podra revivirla.`)
        }
    } catch(error) {
        return res.status(500).send(error)
    }
})
router.post('/:id/reviews', async (req, res) => {
    const userSessionID = req?.session?.passport?.user
    const { rating, comment } = req.body;
    const store = await Store.findById(req.params.id)
    const user = await User.exists({_id: userSessionID});

    if(user){
        if(store){
            const alreadyReviewed = store.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )
            if(alreadyReviewed){
                res.sendStatus(400)
                throw new Error ('Product already reviewed')
            }
            const review = {
                first_name: req.user.first_name, 
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            store.reviews.push(review)
            store.numReviews = store.reviews.length
    
            store.rating = 
            store.reviews.reduce((acc, item) => item.rating + acc, 0) /
            store.reviews.length
    
            await store.save()
            res.status(200).json({message: 'Review added'})
        } else {
            res.status(404)
            throw new Error ('Store not found')
        }
    }

})

module.exports = router