const { Router } = require('express');
const router = Router();
const Store = require('../models/store/store.js');

router.post('/createstore', async (req, res) => {

    const newStore = new Store({
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        id_category: req.body.categories,
        id_product: req.body.products,
        address: req.body.address,
        reputation: req.body.reputation
    })

    try{
        await newStore.save();
        res.status(200).send(newStore)
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/stores', async (req, res) => {
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

router.get('/stores/:id', async (req, res) => {
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

router.patch('/stores/:id', async (req, res) => {
    try{
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(!store){
            res.status(404)
        }
        res.status(200).send(store)
    }catch(error){
        res.status(500).send(error)
    }
}) 

router.delete('/stores/:id', async (req, res) => {
    try{
        const store = await Store.findByIdAndDelete(req.params.id)
        if(!store){
            res.status(404)
        }
        res.status(200).send(store)
    }catch(error){
        res.status(500).send(error)
    }
}) 

module.exports = router