const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/", (req, res, next) => {
    if (req.user) {
        console.log(user, 'req user')
        return res.json(req.user)
        
    } else {
        return res.send(false)
    }
    // res.send("GET DE SINGIN")
})

router.post("/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("user: ", user)
        if(err) throw err;
        if(!user) res.send("No user exist");
        else {
            req.logIn(user, (err) => {
                if(err) throw err;
                res.send("Logeado")
                console.log("Logueado: ", req.user)
            }) 
        }
    }) (req, res, next);
});


// router.post("/", passport.authenticate("local-signin", {
//     successRedirect: "/",
//     failureRedirect: "/failure/signin",
//     passReqToCallback: true
// }))

module.exports = router;