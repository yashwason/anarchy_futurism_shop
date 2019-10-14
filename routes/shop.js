const express = require(`express`),
    router = express.Router(),
    Cart = require(`../models/cart`),
    Product = require(`../models/product`),
    Brand = require(`../models/brand`);


// Shop related stuff
router.get(`/products/:category`, async (req, res) => {
    let productList = [],
        categoryParam = req.params.category.toLowerCase();

    const dbQuery = {};
    if(categoryParam !== `all`){
        dbQuery.gender = categoryParam;
    }

    Product.find(dbQuery)
    .then((products) => {
        if(products.length < 1){
            req.flash(`error`, `No products of that category available!`)
            return res.redirect(`back`);
        }

        productList = products;
        return Brand.find({}).limit(4);
    })
    .then((brands) => {
        return res.render(`shop/catalog`, {
            docTitle: `${req.params.category[0].toUpperCase() + req.params.category.slice(1)} Trainers`,
            pageHeading: `FIND YOUR BEST ${ req.params.category + ' ' }TRAINERS`,
            products: productList,
            brands
        });
    })
    .catch((err) => {
        console.log(err);
        req.flash(`error`, `Something went wrong. Please try again.`)
        return res.redirect(`back`);
    });
});

router.get(`/product/:id`, async (req, res) => {
    Product.findById(req.params.id)
    .then((product) => {
        res.render(`shop/product`, {
            docTitle: `${product.brandName.toUpperCase()} ${product.itemName.toUpperCase()}`,
            pageHeading: `YOUR ${product.brandName} ${product.itemName}`,
            product: product.toObject()
        });
    })
    .catch((err) => {
        console.log(err);
        req.flash(`error`, `Something went wrong. Please try again.`);
        return res.redirect(`back`);
    });
});


// Brand pages related stuff
router.get(`/brands/:id`, (req, res) => {
    let brandName;

    Brand.findById(req.params.id)
    .then((brand) => {
        brandName = brand.brandName;
        return Product.find({brandName: brandName});
    })
    .then((products) => {
        return res.render(`shop/brand-catalog`, {
            docTitle: `${brandName[0].toUpperCase() + brandName.slice(1)} Trainers`,
            pageHeading: `YOUR FAVORITE ${brandName.toUpperCase()} TRAINERS`,
            products
        });
    })
    .catch((err) => {
        console.log(`Error finding brand in DB. ${err}`);
        req.flash(`error`, `Something went wrong. Please try again.`)
        return res.redirect(`back`);
    });
});


// Cart related stuff
router.get(`/cart`, (req, res) => {
    // Not passing req.session.cart into the view as it's a res.local (app.js)
    let products = req.session.cart ? new Cart(req.session.cart).generateItemsArray() : null;

    return res.render(`shop/cart`, {
        docTitle: `Your Shopping Cart`,
        pageHeading: `SHOPPING CART`,
        products
    });
});

router.get(`/add-to-cart/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId)
    .then((item) => {
        cart.addItem(productId, item);
        req.session.cart = cart;
        return res.redirect(`/cart`);
    })
    .catch((err) => {
        return console.log(`Error finding product while adding to cart. ${err}`);
    });
});

router.get(`/reduce-by-one/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    return res.redirect(`/cart`);
});

router.get(`/increase-by-one/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.increaseByOne(productId);
    req.session.cart = cart;
    return res.redirect(`/cart`);
});

router.get(`/remove-from-cart/:id`, (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    return res.redirect(`/cart`);
});

module.exports = router;