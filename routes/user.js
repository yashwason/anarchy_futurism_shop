const express = require(`express`),
    router = express.Router(),
    csrf = require(`csurf`),
    passport = require(`passport`),
    middleware = require(`../middleware`),
    Order = require(`../models/order`);


const csrfProtection = csrf();
router.use(csrfProtection);


router.get(`/signin`,
middleware.notLoggedIn,
(req, res) => {
    res.render(`user/signin`, {
        docTitle: `Account Sign In`,
        pageHeading: `LOGIN TO YOUR ACCOUNT`,
        csrfToken: req.csrfToken()
    });
});

router.post(`/signin`,
middleware.notLoggedIn,
middleware.checkUserCredentials,
middleware.validateUserCredentials,
passport.authenticate(`local-signin`, {
    successRedirect: `/`,
    failureRedirect: `/user/signin`,
    failureFlash: true,
    successFlash: true
}));

router.get(`/signup`,
middleware.notLoggedIn,
(req, res) => {
    res.render(`user/signup`, {
        docTitle: `Register`,
        pageHeading: `CREATE A NEW ACCOUNT`,
        csrfToken: req.csrfToken()
    });
});

router.post(`/signup`,
middleware.notLoggedIn,
middleware.checkUserCredentials,
middleware.validateUserCredentials,
passport.authenticate(`local-signup`, {
    successRedirect: `/`,
    failureRedirect: `/user/signup`,
    failureFlash: true,
    successFlash: true
}));

router.get(`/orders`,
middleware.isLoggedIn,
(req, res) => {
    Order.find({user_id: req.user.id})
    .then((orders) => {
        res.render(`orders`, {
            docTitle: `Your Orders`,
            pageHeading: `YOUR ORDER HISTORY`,
            orders
        });
    })
    .catch((err) => {
        console.log(`Error finding orders in DB. Error: ${err}`);
    });
});


router.get(`/logout`,
middleware.isLoggedIn,
(req, res,) => {
    req.logout();
    req.flash(`success`, `Successfully logged out!`);
    res.redirect(`/`);
});


module.exports = router;