const { Router } = require('express');
const router = Router();
const Store = require('../models/store/store.js');
const verifyToken  = require ("../middlewares/authJwt");
const isAdmin = require ("../middlewares/authJwt");

router.post("/",[verifyToken, isAdmin], async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.patch('/:id',[verifyToken, isAdmin], async (req, res) => {
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

router.delete('/:id',[verifyToken, isAdmin], async (req, res) => {
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