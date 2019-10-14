const express = require(`express`),
    router = express.Router(),
    Order = require(`../models/order`),
    authMiddleware = require(`../middleware/auth`);
    

router.get(`/wishlist`,
    authMiddleware.isLoggedIn,
    async (req, res) => {
        try{
            const products = await req.user.generateWishlist(req.user.wishlist);
            
            res.render(`user/wishlist`, {
                docTitle: `Wishlist`,
                pageHeading: `YOUR PRODUCT WISHLIST`,
                products
            });
        }
        catch(err){
            console.log(err);
            req.flash(`error`, `Something went wrong. Please try again`);
            return res.redirect(`back`);
        }
});

router.get(`/add-to-wishlist/:id`,
    authMiddleware.isLoggedIn,
    async (req, res) => {
        try{
            const productId = req.params.id;
            const currentUser = req.user;

            await req.user.addToWishlist(req, currentUser, productId);
            
            res.redirect(`/wishlist`);
        }
        catch(err){
            console.log(err);
            req.flash(`error`, `Something went wrong. Please try again`);
            return res.redirect(`back`);
        }
});

router.get(`/orders`,
    authMiddleware.isLoggedIn,
    (req, res) => {
        Order.find({user_id: req.user.id})
        .then((orders) => {
            res.render(`user/orders`, {
                docTitle: `Your Orders`,
                pageHeading: `YOUR ORDER HISTORY`,
                orders
            });
        })
        .catch((err) => {
            console.log(`Error finding orders in DB. Error: ${err}`);
            req.flash(`error`, `Something went wrong. Please try again.`);
            return res.redirect(`/`);
        });
});

module.exports = router;