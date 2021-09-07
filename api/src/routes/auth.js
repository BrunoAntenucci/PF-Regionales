const express = require("express")
const router = express.Router();
const passport = require("passport")

router.post("/register_login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({errors: err})
        }
        if (!user) {
            return res.status(400).json({errors: "No user found"});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            console.log(req.user)
            res.status(200).json(info)
        });
    })(req, res, next);
});

module.exports = router;