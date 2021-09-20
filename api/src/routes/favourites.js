const User = require('../models/user/user');
const Favourites = require('../models/favourites/favourites');
const Product = require('../models/Product');
const {Router} = require('express');
const nodemailer = require("nodemailer");

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

			//  res.json({response: favs.products, type: 'Ok', message: 'Success'});
			res.status(200).send(favs.products)
		} else {
			res.status(400).send({type: 'Bad Request', message: 'user not found'});
		}
	} catch (err) {
		res
			.status(500)
			.send({response: '', type: 'Internal server error.', message: err});
	}
})



router.post("/mail", async (req, res, next) =>{
	 const prodId = req.body.id;
	

	try {
		let userM = await Favourites.find({products:{product: prodId}});
		
		if (userM) {
			console.log(userM, "ENTRO A USERM")
			// let favsExist = await Favourites.exists({_id: userSessionID});
			const userFav = userM.map(e => e.user)
			const mailer = userFav.map(async userId => {
				const order = await User.findById(userId);
				const product = await Product.findById(prodId);
				console.log(order.email, "MAIL PEPO")
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
					to: order.email,
					subject: "PF-Regionales Order Confirmed",
					html: `<h1>You are receiving this mail because your favourite product is now available!</h1><br>
					<h2>Here is the link to the product:</h2><br>
						http://localhost:3000/detail/${prodId}<br>
						<img src=${product.image}></img>
						<br>
						<h2>Thank you for your trust in PF-Regionales!</h2>`
				};
				smtpTransport.sendMail(mailOptions, (err) => {
					done(err, 'done');
				});
				
				
			})
				return res.status(200).send(mailer)

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

			//  res.json({response: favs.products, type: 'Ok', message: 'Success'});
			res.status(200).send(favs.products)
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
				let newFavs = await new Favourites({})
				newFavs.user = userSessionID;
				newFavs.products = [...newFavs.products, {product: idProduct}]
				await newFavs.save();
				// let newfavs = await new Favourites({
				// 	user: userSessionID,
				// 	products: [{product: idProduct}],
				// });
				// await newfavs.save();
			}
			let toSend = await Favourites.findOne({user: userSessionID})
				.populate('products.product')
				.exec();
			//res.json({response: toSend.products, type: 'Ok', message: 'Success'});
			res.status(200).send(toSend.products)
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
			// res.json({response: update.products, type: 'Ok', message: 'Success'});
			res.status(200).send(update.products)
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