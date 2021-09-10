const { Router } = require("express");
const passport = require("passport")
const User = require("../models/user/user");
const bcrypt = require("bcryptjs");
const Role = require("../models/role/role"); 
const jwt = require("jsonwebtoken");
const config = require("../../src/config")

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
                const saveUser = await newUser.save();
                console.log(saveUser);
                const token = jwt.sign({id: saveUser._id}, config.SECRET , {
                    expiresIn: 172800 //48hs
                })
                res.json({token});
            }
        })
            
    } catch (error) {
        console.log(error)
        
    }
})
/*
userID = 613b7b8fbbb63e13b1142c78
superuserID = 613b7b8fbbb63e13b1142c79
adminID = 613b7b8fbbb63e13b1142c7a
*/


// router.post("/", passport.authenticate('local-signup', {
//     successRedirect: "/",
//     failureRedirect: "/signup",
//     passReqToCallback: true
// }));

module.exports = router;