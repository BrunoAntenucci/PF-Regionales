const { Router } = require('express');
const router = Router(); 
const Product = require('../models/Product');
const Category = require('../models/Category');
const mongoose = require('mongoose');


router.post("/products", async (req, res) => {
    const {name,description,price, quantity, category, image} = req.body; 
    console.log(req.body)
    if (!name || !description || !price  || !category || !quantity || !image) {
        return res.status(400).json({
            error: 'Something is missing!',
        });
    } 

    const newProduct = await new Product({name, description, price, category , quantity, image})
    const product = await newProduct.save();
    res.json(product);

    // try {
    //     await newProduct.save();
    //     res.json('Product Created');
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send('Server error');
    // }
});

router.get("/products", (req, res) => {
    Product.find({}, (err, products) => {
      Category.populate(products, { path: "category" }, (err, products) => {
        res.status(200).send(products);
      });
    });
  });




router.get("/products/:id", async (req, res) => { 
    const {id} = req.params; 
    
    Product.find({ _id: id }, function(err, product) {
        if (err) {
            return res.json({msj: 'Product missing!'});
        } else {
            return res.json({product});
        }
    })
    

});

/*
"_id": "61302cf18fe3fe25b9bb6ea2",
    "name": "lacteos",

    "_id": "61302d138fe3fe25b9bb6ea5",
    "name": "electronica",

    "_id": "61302d5f8fe3fe25b9bb6ea8",
    "name": "bebidas",

    "_id": "61302d648fe3fe25b9bb6eab",
    "name": "carnes",
*/

module.exports = router;