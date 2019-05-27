require(`dotenv`).config({path:`process.env`});

// Required packages
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require(`body-parser`),
    mongoose = require(`mongoose`),
    session = require(`express-session`),
    passport = require(`passport`),
    flash = require(`connect-flash`);

    
// DB Setup
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});
mongoose.connection.on(`connected`, () => { console.log(`DB has connected`); });


// Configurating PassportJs for authentication
require(`./config/passport`);


// Router files
const INDEXROUTES = require(`./routes/index`),
    PRODUCTSROUTES = require(`./routes/category`),
    PRODUCTROUTES = require(`./routes/product`),
    BRANDROUTES = require(`./routes/brand`),
    USERROUTES = require(`./routes/user`);


// App configurations
app.set(`view engine`, `ejs`);
app.use(express.static(__dirname + `/public`));
app.use(morgan(':method :url - :status - :response-time ms')); // logging http activity
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: `This is Anarchy Futurism people! Project started in 2019`,
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.errMsgs = req.flash(`error`);
    res.locals.successMsgs = req.flash(`success`);
    res.locals.userIsLoggedIn = req.isAuthenticated();
    res.locals.cartSession = req.session.cart;
    
    next();
});


// Using routes
app.use(INDEXROUTES);
app.use(`/product`, PRODUCTROUTES);
app.use(`/products`, PRODUCTSROUTES);
app.use(`/user`, USERROUTES);
app.use(`/brands`, BRANDROUTES);


// Server setup
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});