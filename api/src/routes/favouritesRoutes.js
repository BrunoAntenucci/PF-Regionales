const {Router} = require('express');
const router = Router();
const {
	getUserFavourites,
	addFavourite,
	deleteFavourite,
} = require('./favourites');



router.get('/', getUserFavourites); 
router.post('/', addFavourite); 
router.delete('/', deleteFavourite); 

module.exports = router;
