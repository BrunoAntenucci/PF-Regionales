const { Router } = require("express");
const passport = require("passport")
const User = require("../models/user/user");
const bcrypt = require("bcryptjs");
const Role = require("../models/role/role");


const router = Router();

router.get("/", (req, res, next) => {
    res.send("GET DE SINGUP")
})

router.post("/", (req, res) => {
    try {
        const {roles}=req.body
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
                if (req.body.roles) {
                    const foundRoles = await Role.find({ name: { $in: roles } });
                    newUser.roles = foundRoles.map((role) => role._id);
                  } else {
                    const role = await Role.findOne({ name: "user" });
                    newUser.roles = [role._id];
                  }
                await newUser.save();
                console.log(newUser)
                res.send(newUser)
            }
        })
    
        
    } catch (error) {
        console.log(error)
        
    }
})

// router.post("/", passport.authenticate('local-signup', {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//     passReqToCallback: true
// }));

module.exports = router;