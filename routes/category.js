const express = require(`express`),
    router = express.Router(),
    Product = require(`../models/product`),
    Brand = require(`../models/brand`);

router.get(`/:category`, async (req, res) => {
    const capitalisedCategory = req.params.category[0].toUpperCase() + req.params.category.slice(1);
    let categoryDictionary = {
        all: {query: {}, pageHeading: `FIND YOUR BEST TRAINERS`},
        men: {query: {gender: `men`}, pageHeading: `FIND YOUR BEST MEN'S TRAINERS`},
        women: {query: {gender: `women`}, pageHeading: `FIND YOUR BEST WOMEN'S TRAINERS`},
        kids: {query: {gender: `kids`}, pageHeading: `FIND YOUR BEST KID'S TRAINERS`}
    };

    let products = await Product.find(categoryDictionary[req.params.category.toLowerCase()].query);
    let brands = await Brand.find({}).limit(4);

    res.render(`shop/catalog`, {
        docTitle: `${capitalisedCategory} Trainers`,
        pageHeading: categoryDictionary[req.params.category.toLowerCase()].pageHeading,
        products: products,
        brands: brands
    });
});

module.exports = router;