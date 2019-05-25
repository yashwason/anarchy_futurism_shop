const express = require(`express`),
    router = express.Router();

router.get(`/`, (req, res) => {
    res.render(`home`, {
        docTitle: `Welcome`
    });
});

router.get(`/wishlist`, (req, res) => {
    res.render(`wishlist`, {
        docTitle: `Wishlist`,
        pageHeading: `YOUR PRODUCT WISHLIST`
    });
});

router.get(`/cart`, (req, res) => {
    res.render(`checkout/cart`, {
        docTitle: `Your Shopping Cart`,
        pageHeading: `SHOPPING CART`
    });
});

router.get(`/checkout`, (req, res) => {
    res.render(`checkout/checkout`, {
        docTitle: `Checkout`,
        pageHeading: `CHECKOUT`
    });
});

router.get(`/signin`, (req, res) => {
    res.render(`auth/signin`, {
        docTitle: `Account Sign In`,
        pageHeading: `LOGIN TO YOUR ACCOUNT`
    })
});

router.get(`/signup`, (req, res) => {
    res.render(`auth/signup`, {
        docTitle: `Register`,
        pageHeading: `CREATE A NEW ACCOUNT`
    });
});

module.exports = router;