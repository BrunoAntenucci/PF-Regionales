const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/auth", passport.authenticate('google', { 
    scope: ['email', 'profile']
}));

router.get("/callback", passport.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/google/failure",
}))

router.get("/failure", (req, res, next) => {
    res.send("Something went wrong!");
})

module.exports = router;