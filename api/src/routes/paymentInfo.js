const { Router } = require("express");
const PaymentInfo = require("../models/user/payment_info");
const User = require("../models/user/user");

const router = Router();

router.get("/", (req, res, next) => {
    PaymentInfo.find({}, (err, payments) => {
        res.status(200).send(payments)
    });
});

router.post("/", (req, res, next) => {
    const { bank, 
        first_name_CC, 
        last_name_CC, 
        number_CC, 
        expiration_date_CC, 
        security_number_CC } = req.body;

    const paymentInfo = new PaymentInfo({
        bank: bank,
        first_name_CC: first_name_CC,
        last_name_CC: last_name_CC,
        number_CC: number_CC,
        expiration_date_CC: expiration_date_CC,
        security_number_CC: security_number_CC
    })

    paymentInfo.save()
        .then((result) => {
            User.findOneAndUpdate(
                {"_id": req?.session?.passport?.user}, //Busco el UsuarioID, lo traigo de la Session de Passport
                {$addToSet: {payment_info: result._id}}, //Le agrego al array el paymentInfo._id 
                {new: true}, //Para que la data que devuelve sea el User actualizado, y no el original
                (err, data) => {
                    if(err) {
                        return next(err)
                    } else {
                        return res.send(data)
                    }
                }
            )
        })
        .catch((err) => {
            return next(err)
        })
})

module.exports = router;