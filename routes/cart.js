const express = require(`express`),
    router = express.Router(),
    Cart = require(`../models/cart`),
    Product = require(`../models/product`);

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

module.exports = router;