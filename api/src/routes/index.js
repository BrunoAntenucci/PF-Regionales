const { Router } = require("express");
const signup = require("./signup");
const signin = require("./signin");
const logout = require("./logout")
const user = require("./user");
const paymentInfo = require("./paymentInfo");
const shipInfo = require("./shipInfo");
const categoryRouter = require('./CategoryRoute');
const productRouter = require('./ProductRoute');
const storeRouter = require("./storeRoute.js");
const paginadoProductRouter = require("./paginadoProducts")
const cart = require("./cart");
const Guest = require("../models/guest/guest");

const router = Router();

router.use("/signup", signup);
router.use("/signin", signin);
router.use("/logout", logout);
router.use("/user", user);
router.use("/paymentInfo", paymentInfo);
router.use("/shipInfo", shipInfo);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/product", paginadoProductRouter)
router.use("/store", storeRouter);
router.use("/cart", cart);


router.get("/", (req, res, next) => {
    console.log(req)
    res.send("HOME.Rutas posibles: /signup, /signin, /logout, /user, /paymentInfo, /shipInfo, /category, /stores")
})

module.exports = router;