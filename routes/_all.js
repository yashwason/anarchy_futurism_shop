const express = require(`express`),
    router = express.Router();

// Requiring routers
const indexRoutes = require(`./index`),
    shopRoutes = require(`./shop`),
    checkoutRoutes = require(`./checkout`),
    userRoutes = require(`./user`),
    authRoutes = require(`./auth`);


// Local variables
router.use((req, res, next) => {
    res.locals.errMsgs = req.flash(`error`);
    res.locals.successMsgs = req.flash(`success`);
    res.locals.userIsLoggedIn = req.isAuthenticated();
    res.locals.cartSession = req.session.cart;
    next();
});


// Using routes
router.use(indexRoutes);
router.use(shopRoutes);
router.use(authRoutes);
router.use(checkoutRoutes);
router.use(userRoutes);


module.exports = router;