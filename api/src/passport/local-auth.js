const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require("../models/user/user");
const bcrypt = require("bcrypt-nodejs")

/*
1°: El usuario se autentifica.
2°: Me devuelve el usuario autentificado.
3°: De ese usuario, solamente me almaceno en la session su ID.
4°: Cada vez que el usurio navega a otra pagina, consulto de nuevo en la DB, y si existe me devuelve ese usuario.
*/

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: "877213886996-6eh2aq2fkencrbht8io13oq13vuprkj3.apps.googleusercontent.com",
        clientSecret: "t5-OeEbjLYkZ8bUIvoPhvnzp",
        callbackURL: "http://localhost:3001/google/callback",
        passReqToCallback: true
    },
    async(req, accessToken, refreshToken, profile, done) => {
        const user = await User.findOne(
            {email: profile.email}
            )
            if (user) {
                return done(null, user);
            } else {
                const newUser = new User({})
                newUser.first_name = profile.given_name;
                newUser.last_name = profile.family_name;
                newUser.email = profile.email;
                newUser.password = newUser.encryptPassword(profile.id);
                await newUser.save();
                return done(null, newUser);
            }
        }
        ));
    passport.use(
        new localStrategy({
            usernameField: "email",
            passwordField: "password"
        }, (email, password, done) => {
            User.findOne({email: email}, (err, user) => {
                if(err) return console.log(`Error signin: ${err}`);
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) return console.log(`Error signin: ${err}`);
                    if(result) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
        );
        passport.serializeUser((user, cb) => {
            cb(null, user.id)
        });

        passport.deserializeUser(async (id, cb) => {
            // User.findOne({_id: id}, (err, user) => {
            //     cb(err, user);
            // })
            const user= await User.findById(id).populate("roles")

            return cb(null, user)
    });
};
        


        // passport.serializeUser((user, done) => { // 3°
        //     done(null, user.id); 
        // })
        
        // passport.deserializeUser((id, done) => { // 4°
        //     console.log("CUARTO PASO")
        //     User.findById(id)
        //         .then((user) => {
        //             console.log("deserializeUser")
        //             done(null, user);
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // })
        
        // passport.use('local-signup', new LocalStrategy({ // 1°
        //     usernameField: "email",
        //     passwordField: "password",
        //     passReqToCallback: true
        // }, async (req, email, password, done) => {
        //     //req --> Para recibir otra info ademas del email y la password.
        //     //done --> el callback para devolver una respuesta
        //     //Compruebo que ese email no exista en la DB:
        //     const existUser = await User.findOne({email: email})
        //     if (existUser) {
        //         return done(null, false, req.flash("singupMessage", "The email is already taken."));
        //     } else {
        //         //Aca tengo que almacenarlo en la DB:
        //         const newUser = new User({})
        //         newUser.first_name = req.body.first_name;
        //         newUser.last_name = req.body.last_name;
        //         newUser.email = email;
        //         newUser.password = newUser.encryptPassword(password);
        //         await newUser.save()
        //         done(null, newUser); // 2°
        //     }
        
        // }));
        
        // passport.use('local-signin', new LocalStrategy({ //Comprobar si el usuario existe
        //     usernameField: "email",
        //     passwordField: "password",
        //     passReqToCallback: true
        // }, async (req, email, password, done) => {
        //     const user = await User.findOne({ email: email});
        //     if (!user) {
        //         return done(null, false, req.flash("singinMessage", "User not found."));
        //     }
        //     if (!user.comparePassword(password)) {
        //         return done(null, false, req.flash("singinMessage", "Incorrect password"));
        //     }
        //     if(user) {
        //         req.logIn(user, (err) => {
        //             if (err) {
        //                 return console.log(err)
        //             }
        //             console.log("PUEDE SER POAAAAAAAAAAAAAAAAAAAAAAAAA");
        //             done(null, user);
        //         })
        //     }
        // }))