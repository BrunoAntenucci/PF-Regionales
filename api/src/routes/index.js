const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const categoryRouter = require('./CategoryRoute');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
router.use("/", categoryRouter);


module.exports = router;