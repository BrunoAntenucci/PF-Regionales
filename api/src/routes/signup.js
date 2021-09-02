const { Router } = require("express");
const passport = require("passport")

const router = Router();

router.get("/", (req, res, next) => {
    res.send("GET DE SINGUP")
})

router.post("/", passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/signup",
    passReqToCallback: true
}));

module.exports = router;