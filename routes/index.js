const express = require(`express`),
    router = express.Router(),
    Product = require(`../models/product`),
    Brand = require(`../models/brand`);


router.get(`/`, async (req, res) => {
    let products = await Product.find({}).sort({piecesSold: -1}).limit(3);
    let brands = await Brand.find({}).limit(4);

    res.render(`home`, {
        docTitle: `Welcome`,
        products: products,
        brands: brands
    });
});

module.exports = router;