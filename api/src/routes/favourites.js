const User = require('../models/user/user');
const Favourites = require('../models/favourites/favourites');
const {Router} = require('express');

const router = Router();

router.get("/", async (req, res, next) =>{
	// const {userId} = req.query;
	const userSessionID = req?.session?.passport?.user
	try {
		let user = await User.exists({_id: userSessionID});
		if (user) {
			let favsExist = await Favourites.exists({user: userSessionID});
			if (!favsExist) {
				let newfavs = await new Favourites({
					user: userSessionID,
					products: [],
				});
				await newfavs.save();
			}
			let favs = await Favourites.findOne({user: userSessionID})
				.populate('products.product')
				.exec();
			res.json({response: favs.products, type: 'Ok', message: 'Success'});
		} else {
			res.status(400).send({type: 'Bad Request', message: 'user not found'});
		}
	} catch (err) {
		res
			.status(500)
			.send({response: '', type: 'Internal server error.', message: err});
	}
})
// async function getUserFavourites

router.post("/", async (req, res) =>{
	// const {userId, productId} = req.body;
	const userSessionID = req?.session?.passport?.user
    const idProduct = req.body.idProduct;
	try {
		let user = await User.exists({_id: userSessionID});
		let favs = await Favourites.exists({user: userSessionID});
		if (user) {
			if (favs) {
				favs = await Favourites.findOne({user: userSessionID});
				let add = favs.products.find((e) => e.product == idProduct)
					? false
					: true;

				if (add) {
					favs.products = favs.products.concat([{product: idProduct}]);
					await favs.save();
				}
			} else {
				let newfavs = await new Favourites({
					user: userSessionID,
					products: [{product: idProduct}],
				});
				await newfavs.save();
			}
			let toSend = await Favourites.findOne({user: userSessionID})
				.populate('products.product')
				.exec();
			res.json({response: toSend.products, type: 'Ok', message: 'Success'});
		} else {
			res.status(400).send({type: 'Bad Request', message: 'user not found'});
		}
	} catch (err) {
		res
			.status(500)
			.send({response: '', type: 'Internal server error.', message: err});
	}
})
// async function addFavourite

router.delete("/", async (req, res) => {
	// const {userId, productId} = req.body;
	const userSessionID = req?.session?.passport?.user
    const idProduct = req.body.idProduct;
	try {
		let user = await User.exists({_id: userSessionID});
		if (user) {
			let update = await Favourites.findOneAndUpdate(
				{user: userSessionID},
				{
					$pull: {
						products: {product: {_id: idProduct}},
					},
				}
			).exec();
			update = await Favourites.findOne({user: userSessionID}).populate(
				'products.product'
			);
			res.json({response: update.products, type: 'Ok', message: 'Success'});
		} else {
			res.status(400).send({type: 'Bad Request', message: 'user not found'});
		}
	} catch (err) {
		res
			.status(500)
			.send({response: '', type: 'Internal server error.', message: err});
	}
})
//async function deleteFavourite

// module.exports = {
// 	addFavourite,
// 	getUserFavourites,
// 	deleteFavourite,
// };
module.exports = router;