const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const categoryRouter = require('./CategoryRoute');
const productRouter = require('./ProductRoute');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
router.use("/", categoryRouter); 
router.use("/", productRouter);


module.exports = router;