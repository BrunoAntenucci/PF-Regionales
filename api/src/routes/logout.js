const { Router } = require("express");
const Guest = require("../models/guest/guest");

const router = Router();

router.get("/", (req, res, next) => {
    req.logOut();
    res.redirect("/")
})


module.exports = router;