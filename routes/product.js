const express = require(`express`),
    router = express.Router(),
    Product = require(`../models/product`);

router.get(`/:productId`, async (req, res) => {
    let productId = req.params.productId;

    let product = await Product.findById(productId);

    res.render(`shop/product`, {
        docTitle: `${product.brandName.toUpperCase()} ${product.itemName.toUpperCase()}`,
        pageHeading: `YOUR ${product.brandName} ${product.itemName}`,
        product: product.toObject()
    });
});

module.exports = router;