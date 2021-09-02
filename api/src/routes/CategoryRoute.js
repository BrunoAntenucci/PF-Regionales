const { Router } = require('express');
const router = Router();
const Category = require('../models/Category')

router.post("/", async (req, res) => {
    const {name} = req.body;
    let category = await Category.findOne({name}) 
    if(category) return res.status(404).json({error:'Its already exist. Please try again!'})
    const newCategory = new Category({name});
    category = await newCategory.save();
    res.json(category);       
});

router.get('/', async (req, res) => {
    let data = await Category.find({});
    res.json(data)
})

module.exports = router;