const express = require(`express`),
    router = express.Router(),
    Product = require(`../models/product`),
    Brand = require(`../models/brand`);


router.get(`/`, async (req, res) => {
    let productList = [];
    
    Product.find({}).sort({piecesSold: -1}).limit(3)
    .then((products) => {
        productList = products;
        return Brand.find({}).limit(4)
    })
    .then((brands) => {
        res.render(`index`, {
            docTitle: `Welcome`,
            products: productList,
            brands
        });
    })
    .catch((err) => {
        console.log(err);
        req.flash(`error`, `Something didn't load right. Please try again.`);
        return res.redirect(`/login`);
    })
});

module.exports = router;