const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/", (req, res, next) => {
    if (req.user) {
        return res.json(req.user)
    } else {
        return res.json(false)
    }
    // res.send("GET DE SINGIN")
})

router.post("/", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/signin",
    passReqToCallback: true
}))

module.exports = router;