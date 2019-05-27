const express = require(`express`),
    router = express.Router(),
    middleware = require(`../middleware`),
    Product = require(`../models/product`),
    Brand = require(`../models/brand`),
    Cart = require(`../models/cart`);


router.get(`/`, async (req, res) => {
    let products = await Product.find({}).sort({piecesSold: -1}).limit(3);
    let brands = await Brand.find({}).limit(4);

    res.render(`home`, {
        docTitle: `Welcome`,
        products: products,
        brands: brands
    });
});

router.get(`/wishlist`,
middleware.isLoggedIn,
(req, res) => {
    res.render(`wishlist`, {
        docTitle: `Wishlist`,
        pageHeading: `YOUR PRODUCT WISHLIST`
    });
});

router.get(`/cart`, (req, res) => {
    // Not passing req.session.cart into the view as it's a res.local (app.js)
    if(req.session.cart){
        return res.render(`checkout/cart`, {
            docTitle: `Your Shopping Cart`,
            pageHeading: `SHOPPING CART`,
            products: new Cart(req.session.cart).generateItemsArray()
        });
    }
    return res.render(`checkout/cart`, {
        docTitle: `Your Shopping Cart`,
        pageHeading: `SHOPPING CART`,
        products: null
    });
});

router.get(`/add-to-cart/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId)
    .then((item) => {
        cart.addItem(productId, item);
        req.session.cart = cart;
        res.redirect(`/cart`);
    })
    .catch((err) => {
        console.log(`Error finding product while adding to cart. ${err}`);
    });
});

router.get(`/reduce-by-one/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect(`/cart`);
});

router.get(`/increase-by-one/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;
    res.redirect(`/cart`);
});

router.get(`/remove-from-cart/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect(`/cart`);
});

router.get(`/checkout`,
middleware.isLoggedIn,
(req, res) => {
    res.render(`checkout/checkout`, {
        docTitle: `Checkout`,
        pageHeading: `CHECKOUT`
    });
});

module.exports = router;