const { Router } = require('express');
const router = Router(); 
const Product = require('../models/Product');
const Category = require('../models/Category');



router.get("/", async (req, res) => {
  const allProducts = await Product.find({}).populate('category',{
      name:1
    })
        res.status(200).send(allProducts);
      });


router.get("/search/:name", async (req, res) => {
    const { name } = req.params;
    const nameProduct = await Product.find({name:{ $regex: name, $options:'i' }});
    return res.status(200).send(nameProduct);
});


router.get("/:id",  (req, res) => { 
    const {id} = req.params; 
    
      Product.find({ _id: id }, (err, product) => {
        if (err) {
            return res.json({msj: 'Product missing!'});
        } else {
            return res.json({product});
        }
    })
    

});

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndUpdate({ _id: id },{ ...req.body });
        res.send("Product updated!");
    } catch (err) {
        console.log("Error: " + err);
    }

});
router.delete("/:id", async (req, res) => {
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
// router.get('/filter/categories', async (req, res) => {
//   try {
//       let categories = await Product.distinct('category')
//       if (!categories) {
//           return res.status(400).json({
//               error: 'Categories not found'
//           });
//       }
//       res.json(categories);

//   } catch (error) {
//       console.log(error)
//       res.status(500).send('Server Error')
//   }
// });
module.exports = router;