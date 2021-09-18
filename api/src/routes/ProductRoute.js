const { Router } = require('express');
const router = Router();
const Product = require('../models/Product');
const Category = require('../models/Category'); 
const verifyToken  = require ("../middlewares/authJwt");
const isSuperAdmin = require ("../middlewares/authJwt");
const User = require('../models/user/user');
const offers = require("../middlewares/offers")


router.post("/", [verifyToken, isSuperAdmin], async (req, res) => {
  const { user, name, description, price, quantity, category, image } = req.body; 
  console.log(req.body)
  if ( !name || !description || !price  || !category || !quantity || !image) {
      return res.status(400).json({
          error: 'Something is missing!',
      });
  } 

  const newProduct = await new Product({user, name, description, price, category , quantity, image})
  const product = await newProduct.save();
  res.json(product);
});


router.get("/", async (req, res) => {
  const allProducts = await Product.find({}).populate('category',{
      name: 1
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

router.patch("/:id", async (req, res) => {
  const userSessionID = req?.session?.passport?.user
  const {id} = req.params;
console.log(req.body, "reqBODY")
    try {
        const productCheck = await Product.findById(id);
        if (productCheck.user?.toString() === userSessionID) {
          console.log(`El usuario logeado (id= ${userSessionID}) es el dueño del producto.`)
          await Product.findByIdAndUpdate({ _id: id },{ ...req.body });

          return res.status(200).send(`Producto ${productCheck.name} fue actualizado con exito!`)
        } else {
          console.log(`El usuario logeado (id= ${userSessionID}) NO es el dueño del producto.`)
          return res.send("No puede editar un producto si no es el dueño.")
        }
    } catch (err) {
        console.log("Error: " + err);
    }

});

router.delete("/:id",  async (req, res) => {
  const userSessionID = req?.session?.passport?.user
  const { id }= req.params;
    try {
      const user = await User.findById(userSessionID);
      const productCheck = await Product.findById(id)
      if (user.role === "SuperAdmin" || productCheck.user.toString() === userSessionID) {
        console.log(`El usuario id= ${userSessionID} es SuperAdmin o el dueño del producto.`)
        await Product.deleteOne({ _id: id });
        return res.status(200).send(`El producto ${productCheck.name} fue eliminado con exito.`)
      } else {
        console.log(`El usuario id= ${userSessionID} NO es SuperAdmin o el dueño del producto.`)
        return res.send("No puede eliminar un producto si no es su dueño o SuperAdmin")
      }
    } catch (err) {
      console.log("Error", err);
    }
  });

module.exports = router;