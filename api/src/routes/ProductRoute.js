const { Router } = require('express');
const router = Router(); 
const Product = require('../models/Product');
const Category = require('../models/Category');

router.post("/product", async (req, res) => {
    const {user,name,description,price, quantity, category, image} = req.body; 
    console.log(req.body)
    if (!user, !name || !description || !price  || !category || !quantity || !image) {
        return res.status(400).json({
            error: 'Something is missing!',
        });
    } 

    const newProduct = await new Product({user, name, description, price, category , quantity, image})
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

// router.get("/product", (req, res) => {
//     Product.find({}, (err, products) => {
//       Category.populate(products, { path: "category" }, (err, products) => {
//         res.status(200).send(products);
//       });
//     });
//   });

router.get("/product", async(req,res)=>{
  const options={
    limit:5,
    page:1,
    populate: 'category'
  }
  const pag= await Product.paginate({}, options);
  res.json(pag);
})


router.get("/product/search/:name", async (req, res) => {
    const { name } = req.params;
    const nameProduct = await Product.find({name:{ $regex: name, $options:'i' }});
    return res.status(200).send(nameProduct);
});


router.get("/product/:id",  (req, res) => { 
    const {id} = req.params; 
    
      Product.find({ _id: id }, (err, product) => {
        if (err) {
            return res.json({msj: 'Product missing!'});
        } else {
            return res.json({product});
        }
    })
    

});

router.put("/product/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndUpdate({ _id: id },{ ...req.body });
        res.send("Product updated!");
    } catch (err) {
        console.log("Error: " + err);
    }

});
router.delete("/product/:id", async (req, res) => {
    try {
      const {id }= req.params;
      await Product.deleteOne({ _id: id });
      res.send("Product deleted!");
    } catch (err) {
      console.log("Error", err);
    }
  });

/*
"_id": "61316496a16c17b5b015bc6f",
    "name": "lacteos",

    "_id": "6131648ca16c17b5b015bc6c",
    "name": "electronica",

    "_id": "6130f92ff3d685f0abf597bf",
    "name": "bebidas",

    "_id": "6131649ca16c17b5b015bc72",
    "name": "carnes",
*/

module.exports = router;