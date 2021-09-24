const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../src/config")


const router = Router();

router.get("/", (req, res, next) => {
    if (req.user) {
        return res.send(req.user)
    } else {
        return res.send(false)
    }
    // res.send("GET DE SINGIN")
})

router.post("/", (req, res, next) => {
    // console.log(req)
    passport.authenticate("local", (err, user, info) => {
        if(err) return console.log(`Error signin: ${err}`);
        if(!user) return res.send("No user exist");
        else {
            req.logIn(user, (err) => {
                if(err) return console.log(`Error signin: ${err}`);
                console.log("Logueado: ", req.user)
            }) 
        }
        return res.send("Logeado")
        // const token = jwt.sign({id: user._id}, config.SECRET,{
        // expiresIn: 86400 //24hs
        // })
        // return res.json({token})
      
    })(req, res, next)

});

/*
userID = 613b7b8fbbb63e13b1142c78
superuserID = 613b7b8fbbb63e13b1142c79
adminID = 613b7b8fbbb63e13b1142c7a
*/


// router.post("/", passport.authenticate("local-signin", {
//     successRedirect: "/",
//     failureRedirect: "/failure/signin",
//     passReqToCallback: true
// }))

module.exports = router;