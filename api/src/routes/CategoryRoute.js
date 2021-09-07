const { Router } = require('express');
const router = Router();
const Category = require('../models/Category')
const Product = require('../models/Product')

router.post("/create", async (req, res) => {
    const {name,product} = req.body;
    let category = await Category.findOne({name}) 
    if(category) return res.status(404).json({error:'Its already exist. Please try again!'})
    const newCategory = new Category({name,product});
    category = await newCategory.save();
    res.json(category);       
});

router.get('/', async (req, res) => {
    let data = await Category.find({}).populate('product',{
        name: 1,
        description: 1
    })
    res.json(data)
    
});

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

router.get("/:id",  (req, res) => { 
    const {id} = req.params; 

      Category.find({ _id: id }, (err, category) => {
        if (err) {
            return res.json({msj: 'Category missing!'});
        } else {
            return res.json({category});
        }
    })

});

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await Category.findByIdAndUpdate({ _id: id },{ ...req.body });
        res.send("Category updated!");
    } catch (err) {
        console.log("Error: " + err);
    }

});

module.exports = router;