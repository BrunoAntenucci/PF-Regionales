const { Router } = require("express");
const User = require("../models/user/user");
const PaymentInfo = require("../models/user/payment_info")
const ShipInfo = require("../models/user/ship_info")
const Guest = require("../models/guest/guest");
const async = require("async")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Cart = require("../models/cart/cart");
const verifyToken  = require ("../middlewares/authJwt");
const isSuperAdmin = require ("../middlewares/authJwt");

const router = Router();

router.get("/", (req, res, next) => {
    User.find({}, (err, users) => {
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


router.get("/guest", (req, res, next) => {
    Guest.find({}, (err, guests) => {
        res.status(200).send(guests)
    })
})

router.delete("/delete", (req, res, next) => {
    const { userId } = req.body;
    User.findByIdAndRemove(userId) //findByIdAndDelete
    .then((result) => {
        res.status(200).send(`User with id= ${result._id} removed.`)
    })
})

router.get("/forgot", (req, res, next) => {
    res.send("Finalizo el proceso de resetear la contraseña") //req.user
})

router.post("/forgot", (req, res, next) => { //Recibe un email
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
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
        },
        function(token, user, done) {
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
                'http://http://localhost:3000/user/reset/' + token + '\n\n' + //PARA EL DEPLOY, CAMBIAR A: https://pf-regionales.vercel.app/user/reset/
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('info', `An email has been sent to ${user.email} with further instructions.`);
                done(err, 'done');
            });
        }
    ], function(err) {
        console.log("4")
        if (err) {
            return next(err);
        }
        res.redirect("/user/forgot")
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
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/user/forgot/failed');
          }
  
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 465,
            auth: {
                user: "apikey",
                pass: "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"
            }
        });
        var mailOptions = {
            from: "matt_boca@hotmail.com",
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/user/forgot');
    });
  });

router.get("/forgot/failed", (req, res, next) => {
    res.send("[Fallo el proceso de resetear la contraseña] Password reset token is invalid or has expired.") //req.user
})
router.get("/forgot/completed", (req, res, next) => {
    res.send("[Finalizo el proceso de resetear la contraseña] Password reset succefully.") //req.user
})

module.exports = router;