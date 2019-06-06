const express = require(`express`),
    router = express.Router(),
    middleware = require(`../middleware`);
    

router.get(`/wishlist`,
middleware.isLoggedIn,
async (req, res) => {
    const products = await req.user.generateWishlist(req.user.wishlist);
    
    res.render(`wishlist`, {
        docTitle: `Wishlist`,
        pageHeading: `YOUR PRODUCT WISHLIST`,
        products
    });
});

router.get(`/add-to-wishlist/:id`,
middleware.isLoggedIn,
async (req, res) => {
    const productId = req.params.id;
    const currentUser = req.user;

    await req.user.addToWishlist(req, currentUser, productId);
    
    res.redirect(`/wishlist`);
});

module.exports = router;