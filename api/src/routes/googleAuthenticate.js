const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/auth", passport.authenticate('google', { 
    scope: ['email', 'profile']
}));

router.get("/callback", passport.authenticate('google', {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/google/failure",
}), (req, res) => {
    res.send("Logged in with google")
})

router.get("/failure", (req, res, next) => {
    res.send("Something went wrong!");
})

module.exports = router;