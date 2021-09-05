const { Router } = require('express');
const router = Router(); 
const Product = require('../models/Product');

router.get('/product/page/:page', (req, res, next) => {
    let porPage = 3;
    let page = req.params.page || 1;
  
    Product
      .find({}) // todos los productos
      .skip((porPage * page) - porPage) // en la primer pag el salto es 0
      .limit(porPage) // 20 product por pag
      .exec((err, products) => {
        Product.count((err, count) => { // count calcula el nro de pag
          if (err) return next(err);
          res.status(200).json({
            products,
            currentPage: page,
            pages: Math.ceil(count / porPage)
          });
        });
      });
  });

//  router.get("/product", async(req,res)=>{
//   const options={
//     limit:5,
//     page:1,
//     populate: 'category'
//   }
//   const pag= await Product.paginate({}, options);
//   res.json(pag);
// })

  module.exports = router;