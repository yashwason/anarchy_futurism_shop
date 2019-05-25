const express = require(`express`),
    router = express.Router();

router.get(`/:productId`, (req, res) => {
    let productId = req.params.productId;

    res.render(`shop/product`, {
        docTitle: `Product Name`,
        pageHeading: `YOUR NIKE AIRMAX 270`
    });
});

module.exports = router;