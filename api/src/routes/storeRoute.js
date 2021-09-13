const { Router } = require('express');
const router = Router();
const Store = require('../models/store/store.js');
const verifyToken  = require ("../middlewares/authJwt");
const isAdmin = require ("../middlewares/authJwt");
const User = require("../models/user/user");

router.post("/", [verifyToken, isAdmin], async (req, res) => {
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
router.post('/:id', async (req, res) => {
    const userSessionID = req?.session?.passport?.user
    const { reputation, comment } = req.body;
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
                reputation: Number(reputation),
                comment,
                user: req.user._id
            }
            store.reviews.push(review)
            store.numReviews = store.reviews.length
    
            store.reputation = 
            store.reviews.reduce((acc, item) => item.reputation + acc, 0) /
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