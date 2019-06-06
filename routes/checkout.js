const express = require(`express`),
    router = express.Router(),
    middleware = require(`../middleware`);

router.get(`/checkout`,
middleware.isLoggedIn,
(req, res) => {
    res.render(`checkout/checkout`, {
        docTitle: `Checkout`,
        pageHeading: `CHECKOUT`
    });
});


module.exports = router;