const express = require(`express`),
    router = express.Router(),
    csrf = require(`csurf`),
    passport = require(`passport`),
    authMiddleware = require(`../middleware/auth`);


const csrfProtection = csrf();


router.get(`/signin`,
    authMiddleware.notLoggedIn,
    csrfProtection,
    (req, res) => {
        res.render(`auth/signin`, {
            docTitle: `Account Sign In`,
            pageHeading: `LOGIN TO YOUR ACCOUNT`,
            csrfToken: req.csrfToken()
        });
});

router.post(`/signin`,
    authMiddleware.notLoggedIn,
    authMiddleware.checkUserCredentials,
    authMiddleware.validateUserCredentials,
    csrfProtection,
    passport.authenticate(`local-signin`, {
        successRedirect: `/`,
        failureRedirect: `/signin`,
        failureFlash: true,
        successFlash: true
}));

router.get(`/signup`,
    authMiddleware.notLoggedIn,
    csrfProtection,
    (req, res) => {
        res.render(`auth/signup`, {
            docTitle: `Register`,
            pageHeading: `CREATE A NEW ACCOUNT`,
            csrfToken: req.csrfToken()
        });
});

router.post(`/signup`,
    authMiddleware.notLoggedIn,
    authMiddleware.checkUserCredentials,
    authMiddleware.validateUserCredentials,
    csrfProtection,
    passport.authenticate(`local-signup`, {
        successRedirect: `/`,
        failureRedirect: `/signup`,
        failureFlash: true,
        successFlash: true
}));

router.get(`/logout`,
    authMiddleware.isLoggedIn,
    (req, res,) => {
        req.logout();
        req.flash(`success`, `Successfully logged out!`);
        res.redirect(`/`);
});


module.exports = router;