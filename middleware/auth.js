const {check, validationResult} = require(`express-validator/check`);

const checkUserCredentials = [
    check(`email`).isEmail().withMessage(`You entered an invalid e-mail`),

    check(`password`)
    .isLength({min: 5}).withMessage(`Password must be at least 5 characters long`)
    .isAlphanumeric().withMessage(`Password must be a combination of alphabets and numbers`)
];

function validateUserCredentials(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        let errMsgs = errors.array().map((error) => {
            return error.msg;
        });
        req.flash(`error`, errMsgs);
        return res.redirect(req.originalUrl);
    }
    return next();
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();

    req.flash(`error`, `You need to be logged in for that!`);
    res.redirect(`/signin`);
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()) return next();

    req.flash(`error`, `Cannot go there when logged in!`);
    res.redirect(`/`);
}


module.exports = { checkUserCredentials, validateUserCredentials, isLoggedIn, notLoggedIn };