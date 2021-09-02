const { Router } = require('express');
const router = Router();
const Category = require('../models/Category')


router.post("/create", async (req, res) => {
    const {name} = req.body;

    
        let category = await Category.findOne({name}) 
        if(category) return res.status(404).json({error:'Its already exist. Please try again!'})
        const newCategory = new Category({name});
        category = await newCategory.save();
        res.json(category);       

    

});

router.get('/all', async (req, res) => {
    let data = await Category.find({});
    res.json(data)
})

router.get('/:name', async (req, res) => {
    const name  = req.params.name
    const data = await Category.findOne({ name:name })
    res.json(data)
    
})

router.delete('/delete', async (req, res) => {
    const name = req.body.name
    await Category.deleteOne({ name:name })
    res.json({ msg: 'Category eliminated'})
})

module.exports = router;