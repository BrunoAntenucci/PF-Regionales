const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require("../models/user/user");
const Guest = require("../models/guest/guest");

/*
1°: El usuario se autentifica.
2°: Me devuelve el usuario autentificado.
3°: De ese usuario, solamente me almaceno en la session su ID.
4°: Cada vez que el usurio navega a otra pagina, consulto de nuevo en la DB, y si existe me devuelve ese usuario.
*/

passport.serializeUser((user, done) => { // 3°
    done(null, user.id); 
})

passport.deserializeUser(async (id, done) => { // 4°
    const user = await User.findById(id);
    done(null, user);
})

passport.use('local-signup', new LocalStrategy({ // 1°
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    //req --> Para recibir otra info ademas del email y la password.
    //done --> el callback para devolver una respuesta
    //Compruebo que ese email no exista en la DB:
    const existUser = await User.findOne({email: email})
    if (existUser) {
        return done(null, false, req.flash("singupMessage", "The email is already taken."));
    } else {
        //Aca tengo que almacenarlo en la DB:
        const newUser = new User({})
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save()
        done(null, newUser); // 2°
    }

}));

passport.use('local-signin', new LocalStrategy({ //Comprobar si el usuario existe
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const guest = await Guest.findById(req.sessionID);
    const user = await User.findOne({ email: email});
    if (guest && guest.cart.length !== 0) {
        user.cart = [...user.cart, ...guest.cart]
        user.save();
    }
    if (!user) {
        return done(null, false, req.flash("singinMessage", "User not found."));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash("singinMessage", "Incorrect password"));
    }
    done(null, user);
}))



passport.use(new GoogleStrategy({
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