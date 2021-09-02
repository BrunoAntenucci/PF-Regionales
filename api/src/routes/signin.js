const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/", (req, res, next) => {
    res.send("GET DE SINGIN")
})

router.post("/", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/signin",
    passReqToCallback: true
}))

module.exports = router;