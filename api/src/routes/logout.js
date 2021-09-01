const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
    req.logOut();
    res.redirect("/")
})


module.exports = router;