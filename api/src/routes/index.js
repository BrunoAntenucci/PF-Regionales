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
const googleAuthenticate = require("./googleAuthenticate")
const paginadoProductRouter = require("./PaginadoProducts")
const cartOld = require("./cart");
const cart = require("./cart2");
const order = require("./order")
const auth = require("./auth")
const favourites = require("./favourites");
const petition = require("./petition");
const analytics = require("./analytics");
const offers = require("./offers")

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
router.use("/google", googleAuthenticate)
router.use("/cartOld", cartOld);
router.use("/order", order)
router.use("/auth", auth)
router.use("/favourites", favourites);
// router.use("/reviews", reviews);
router.use("/petition", petition);
router.use("/analytics", analytics);
router.use("/offers", offers)

router.get("/", (req, res, next) => {
    res.send(req.user);
})
router.get("/failure/signin", (req, res, next) => {
    res.send("MAL SIGN IN")
})

module.exports = router;