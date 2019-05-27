const express = require(`express`),
    router = express.Router(),
    Brand = require(`../models/brand`),
    Product = require(`../models/product`);

router.get(`/:brandId`, (req, res) => {
    let brandName;
    Brand.findById(req.params.brandId)
    .then((brand) => {
        brandName = brand.brandName;
        return Product.find({brandName: brandName});
    })
    .then((products) => {
        brandName = brandName[0].toUpperCase() + brandName.slice(1);
        res.render(`shop/brand-catalog`, {
            docTitle: `${brandName} Trainers`,
            pageHeading: `YOUR FAVORITE ${brandName.toUpperCase()} TRAINERS`,
            products: products
        })
    })
    .catch((err) => {
        console.log(`Error finding brand in DB. ${err}`);
    });
});

module.exports = router;