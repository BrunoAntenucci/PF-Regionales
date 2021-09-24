const { Router } = require("express");
const User = require("../models/user/user");
const PaymentInfo = require("../models/user/payment_info")
const ShipInfo = require("../models/user/ship_info")
const Store = require("../models/store/store");
const async = require("async")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Cart = require("../models/cart/cart");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");

const router = Router();

router.get("/",(req, res, next) => {
    User.find({isActive: true}, (err, users) => {
        res.status(200).send(users)
    })
});

router.get("/inactives",(req, res, next) => {
    User.find({isActive: false}, (err, users) => {
        res.status(200).send(users)
    })
});


router.get("/all", (req, res, next) => {
    User.find({}, (err, users) => {
        PaymentInfo.populate(users, { path: "payment_info" }, (err, users) => {
            ShipInfo.populate(users, { path: "ship_info" }, (err, users) => {
                Cart.populate(users, { path: "cart" }, (err, users) => {
                    res.status(200).send(users)
                })
            })
        })
    })
})


router.delete("/delete", async(req, res, next) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.isActive = false;
    await user.save()
        .then(() => {
            console.log(`Usuario ${user.email} ahora es inactivo`)
        })
        .catch((err) => {
            next(err)
        })
    const products = await Product.find({user: userId});
    console.log("Productos de ese usuario: ", products)
    products.forEach(async(product) => {
        product.isActive = false;
        await product.save()
    })
    const stores = await Store.find({owner: userId});
    console.log("Stores de ese usuario: ", stores)
    stores.forEach(async(store) => {
        store.isActive = false;
        await store.save()
    })
    return res.status(200).send(`Se eliminó el usuario, sus productos y sus tiendas.`)
})

router.post("/revive", async(req, res, next) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    user.isActive = true;
    await user.save()
        .then(() => {
            console.log(`Usuario ${user.email} ahora es activo nuevamente`)
        })
        .catch((err) => {
            next(err)
        })
    const products = await Product.find({user: userId});
    console.log("Productos de ese usuario: ", products)
    products.forEach(async(product) => {
        product.isActive = true;
        await product.save()
    })
    const stores = await Store.find({owner: userId});
    console.log("Stores de ese usuario: ", stores)
    stores.forEach(async(store) => {
        store.isActive = true;
        await store.save()
    })
    return res.status(200).send(`Se revivio al usuario, sus productos y sus tiendas.`)
})

router.get("/forgot", (req, res, next) => {
    res.send("Finalizo el proceso de resetear la contraseña") //req.user
})

router.post("/forgot", (req, res, next) => { //Recibe un email
    async.waterfall([
        function(done) {
            console.log("1-a")
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
            console.log("1-b")
        },
        function(token, done) {
            console.log("2-a")
            User.findOne({email: req.body.email}, (err, user) => {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect("/forgot");
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

                user.save((err) => {
                    done(err, token, user);
                });
            });
            console.log("2-b")
        },
        function(token, user, done) {
            console.log("3-a")
            var smtpTransport = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 465,
                auth: {
                    user: "apikey",
                    pass: "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" //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
                }
            });
            var mailOptions = {
                from: "alumnohenry09@gmail.com",
                to: user.email,
                subject: "PF-Regionales Password Reset",
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://localhost:3000/user/reset/' + token + '\n\n' + //PARA EL DEPLOY, CAMBIAR A: https://pf-regionales.vercel.app/user/reset/
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('info', `An email has been sent to ${user.email} with further instructions.`);
                done(err, 'done');
            });
            console.log("3-b")
        }
    ], function(err) {
        console.log("4-a")
        if (err) {
            return next(err);
        }
        res.redirect("/user/forgot")
        console.log("4-a")
    });
});

router.get("/reset/:token", (req, res, next) => {
    User.findOne( {resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now()} }, (err, user) => {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect("/user/forgot")
        }
        res.json("input new password") //req.user o redirect a /reset/:token
    })
})

router.post('/reset/:token', (req, res, next) => {
    async.waterfall([
      function(done) {
        console.log("5-a")
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/user/forgot/failed');
          }
          const hashPassword = await bcrypt.hash(req.body.password, 10);
          user.password = hashPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
        console.log("5-b")
      },
      function(user, done) {
        console.log("6-a")
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: "apikey",
                pass: "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"
            }
        });
        var mailOptions = {
            from: "alumnohenry09@gmail.com",
            to: user.email,
            subject: 'PF-Regionales Password Changed',
            text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
        console.log("6-b")
      }
    ], function(err) {
        console.log("7-a")
      res.redirect('/user/forgot');
      console.log("7-b")
    });
  });

router.get("/forgot/failed", (req, res, next) => {
    res.send("[Fallo el proceso de resetear la contraseña] Password reset token is invalid or has expired.") //req.user
})
router.get("/forgot/completed", (req, res, next) => {
    res.send("[Finalizo el proceso de resetear la contraseña] Password reset succefully.") //req.user
})

module.exports = router;