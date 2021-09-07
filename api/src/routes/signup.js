const { Router } = require("express");
const passport = require("passport")
const User = require("../models/user/user");
const bcrypt = require("bcryptjs");

const router = Router();

router.get("/", (req, res, next) => {
    res.send("GET DE SINGUP")
})

router.post("/", (req, res) => {
    console.log(req.body)
    User.findOne({email: req.body.email}, async(err, user) => {
        if(err) throw err;
        if(user) res.send("User ya existe")
        if(!user) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashPassword
            })
            await newUser.save();
            res.send(newUser)
        }
    })
})

// router.post("/", passport.authenticate('local-signup', {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//     passReqToCallback: true
// }));

module.exports = router;