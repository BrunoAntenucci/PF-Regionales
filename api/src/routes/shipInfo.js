const { Router } = require("express");
const ShipInfo = require("../models/user/ship_info");
const User = require("../models/user/user");

const router = Router();

router.get("/", (req, res, next) => {
    ShipInfo.find({}, (err, shipments) => {
        res.status(200).send(shipments)
    });
});
router.get("/user/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const shipInfoUser = await User.findById(userId).populate("ship_info")
    res.status(200).send(shipInfoUser.ship_info)
})
router.post("/", (req, res, next) => {
    const {
        country,
        city,
        postal_code,
        address_name,
        address_number,
    } = req.body;

    const shipInfo = new ShipInfo({
        country: country,
        city: city,
        postal_code: postal_code,
        address_name: address_name,
        address_number: address_number
    })

    shipInfo.save()
        .then((result) => {
            User.findOneAndUpdate(
                {"_id": req?.session?.passport?.user}, //Busco el UsuarioID, lo traigo de la Session de Passport
                {$addToSet: {ship_info: result._id}}, //Le agrego al array el shipInfo._id 
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