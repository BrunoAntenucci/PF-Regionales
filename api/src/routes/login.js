const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/", (req, res, next) => {
    res.send("ENTRE A LOGIN/")
});

router.post("/", (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    const user = new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    })
    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
});

module.exports = router;